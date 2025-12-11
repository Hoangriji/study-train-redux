import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPersonsThunk,
  deletePersonThunk,
  setLimit,
  setSortBy,
  setOrder,
  nextPage,
  prevPage,
} from '../../store/slices/personSlice';
import PersonRow from '../PersonRow';
import AddPersonModal from '../AddPersonModal';
import ConfirmDialog from '../ConfirmDialog';
import ErrorPage from '../ErrorPage';
import Toast from '../Toast';
import './PersonTable.css';

const PersonTable = () => {
  const dispatch = useDispatch();
  const { persons, loading, error, currentPage, limit, sortBy, order, hasMore } = useSelector(
    (state) => state.persons
  );

  // Local state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, personId: null, personName: '' });
  const [toast, setToast] = useState(null);
  const [editingPersonId, setEditingPersonId] = useState(null);

  // Virtual scroll state
  const tableBodyRef = useRef(null);
  const ROW_HEIGHT = 60; // Height of each row in pixels
  const BUFFER_SIZE = 10; // Number of rows to render outside viewport
  
  // Calculate initial visible range based on persons length
  const getInitialVisibleRange = () => ({
    start: 0,
    end: Math.min(persons.length, limit + BUFFER_SIZE)
  });
  
  const [visibleRange, setVisibleRange] = useState(getInitialVisibleRange);

  // Fetch data when page or settings change
  useEffect(() => {
    dispatch(fetchPersonsThunk({ page: currentPage, limit, sortBy, order }));
  }, [dispatch, currentPage, limit, sortBy, order]);

  // Reset scroll and visible range when page or data changes
  useEffect(() => {
    if (tableBodyRef.current) {
      tableBodyRef.current.scrollTop = 0;
    }
    // Force update visible range when persons change
    requestAnimationFrame(() => {
      setVisibleRange({ start: 0, end: Math.min(persons.length, limit + BUFFER_SIZE) });
    });
  }, [currentPage, persons.length, limit, BUFFER_SIZE]);

  // Virtual scroll: Calculate visible range based on scroll position
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;

    // Calculate visible range for virtual scrolling
    const startIndex = Math.floor(scrollTop / ROW_HEIGHT);
    const endIndex = Math.ceil((scrollTop + clientHeight) / ROW_HEIGHT);
    setVisibleRange({
      start: Math.max(0, startIndex - BUFFER_SIZE),
      end: Math.min(persons.length, endIndex + BUFFER_SIZE),
    });

    // Auto pagination: Go to next page when scrolled to 99%
    const scrollPercentage = ((scrollTop + clientHeight) / scrollHeight) * 100;
    if (scrollPercentage >= 99.5 && hasMore && !loading) {
      dispatch(nextPage());
    }
  };

  // Get visible persons for virtual scrolling
  const visiblePersons = persons.slice(visibleRange.start, visibleRange.end);
  const offsetY = visibleRange.start * ROW_HEIGHT;
  const totalHeight = persons.length * ROW_HEIGHT;

  // Handle delete
  const handleDeleteClick = (person) => {
    setDeleteConfirm({
      isOpen: true,
      personId: person.id,
      personName: person.name || 'this person',
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deletePersonThunk(deleteConfirm.personId)).unwrap();
      setToast({ message: 'Person deleted successfully', type: 'success' });
    } catch (err) {
      setToast({ message: `Failed to delete: ${err}`, type: 'error' });
    }
    setDeleteConfirm({ isOpen: false, personId: null, personName: '' });
  };

  // Handle edit
  const handleEditClick = (personId) => {
    setEditingPersonId(personId);
  };

  const handleEditCancel = () => {
    setEditingPersonId(null);
  };

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(prevPage());
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      dispatch(nextPage());
    }
  };

  // Show error page if initial load fails
  if (error && persons.length === 0 && !loading) {
    return <ErrorPage error={error} onRetry={() => dispatch(fetchPersonsThunk({ page: 1, limit, sortBy, order }))} />;
  }

  return (
    <div className="person-table-container">
      {/* Header with controls */}
      <div className="table-header">
        <h1>
          <i className="fas fa-users"></i> Person Management
        </h1>
        <div className="table-controls">
          {/* Limit selector */}
          <div className="control-group">
            <label>Show:</label>
            <select value={limit} onChange={(e) => dispatch(setLimit(parseInt(e.target.value)))}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          {/* Sort by selector */}
          <div className="control-group">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))}>
              <option value="createdAt">Created Date</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
            </select>
          </div>

          {/* Sort order selector */}
          <div className="control-group">
            <label>Order:</label>
            <select value={order} onChange={(e) => dispatch(setOrder(e.target.value))}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          {/* Add button */}
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <i className="fas fa-plus"></i> Add Person
          </button>
        </div>
      </div>

      {/* Loading spinner for initial load */}
      {loading && persons.length === 0 ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading persons...</p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="table-wrapper" ref={tableBodyRef} onScroll={handleScroll}>
            <table className="person-table">
              <thead>
                <tr>
                  <th style={{ width: '70px' }}>Avatar</th>
                  <th style={{ width: '12%' }}>Name</th>
                  <th style={{ width: '18%' }}>Email</th>
                  <th style={{ width: '12%' }}>Phone</th>
                  <th style={{ width: '12%' }}>City</th>
                  <th style={{ width: '15%' }}>Job</th>
                  <th style={{ width: '10%' }}>Created At</th>
                  <th style={{ width: '180px' }}>Actions</th>
                </tr>
              </thead>
              <tbody style={{ height: `${totalHeight}px`, position: 'relative' }}>
                <tr style={{ height: `${offsetY}px` }}></tr>
                {visiblePersons.map((person) => (
                  <PersonRow
                    key={person.id}
                    person={person}
                    isEditing={editingPersonId === person.id}
                    onEdit={() => handleEditClick(person.id)}
                    onEditCancel={handleEditCancel}
                    onDelete={() => handleDeleteClick(person)}
                    onEditSuccess={() => {
                      setEditingPersonId(null);
                      setToast({ message: 'Person updated successfully', type: 'success' });
                    }}
                    onEditError={(err) => setToast({ message: `Failed to update: ${err}`, type: 'error' })}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="pagination-container">
            <button 
              className="btn-pagination" 
              onClick={handlePrevPage} 
              disabled={currentPage === 1 || loading}
            >
              <i className="fas fa-chevron-left"></i> Previous
            </button>
            
            <div className="page-info">
              Page <strong>{currentPage}</strong>
            </div>
            
            <button 
              className="btn-pagination" 
              onClick={handleNextPage} 
              disabled={!hasMore || loading}
            >
              Next <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </>
      )}

      {/* Modals and dialogs */}
      <AddPersonModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          setIsAddModalOpen(false);
          setToast({ message: 'Person added successfully', type: 'success' });
          // Reload page 1 after add
          dispatch(fetchPersonsThunk({ page: 1, limit, sortBy, order }));
        }}
        onError={(err) => setToast({ message: `Failed to add: ${err}`, type: 'error' })}
      />

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Person"
        message={`Are you sure you want to delete ${deleteConfirm.personName}? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirm({ isOpen: false, personId: null, personName: '' })}
      />

      {/* Toast notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default PersonTable;

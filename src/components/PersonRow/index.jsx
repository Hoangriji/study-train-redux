import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePersonThunk } from '../../store/slices/personSlice';

/**
 * PersonRow component - displays a person row with inline edit capability
 */
const PersonRow = ({ person, isEditing, onEdit, onEditCancel, onDelete, onEditSuccess, onEditError }) => {
  const dispatch = useDispatch();
  const [editData, setEditData] = useState({
    name: person.name || '',
    email: person.email || '',
  });
  const [isSaving, setIsSaving] = useState(false);

  // Handle save edit
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await dispatch(updatePersonThunk({ id: person.id, personData: editData })).unwrap();
      onEditSuccess();
    } catch (err) {
      onEditError(err);
    } finally {
      setIsSaving(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (isEditing) {
    return (
      <tr>
        <td>
          <img src={person.avatar || 'https://via.placeholder.com/40'} alt={person.name} className="person-avatar" />
        </td>
        <td>
          <input
            type="text"
            className="edit-input"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />
        </td>
        <td>
          <input
            type="email"
            className="edit-input"
            value={editData.email}
            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
          />
        </td>
        <td>{person.phone || 'N/A'}</td>
        <td>{person.city || 'N/A'}</td>
        <td>{person.job || 'N/A'}</td>
        <td>{formatDate(person.createdAt)}</td>
        <td>
          <div className="person-actions">
            <button className="btn-icon btn-save" onClick={handleSave} disabled={isSaving}>
              <i className="fas fa-check"></i> Save
            </button>
            <button className="btn-icon btn-cancel" onClick={onEditCancel} disabled={isSaving}>
              <i className="fas fa-times"></i> Cancel
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>
        <img src={person.avatar || 'https://via.placeholder.com/40'} alt={person.name} className="person-avatar" />
      </td>
      <td>{person.name || 'N/A'}</td>
      <td>{person.email || 'N/A'}</td>
      <td>{person.phone || 'N/A'}</td>
      <td>{person.city || 'N/A'}</td>
      <td>{person.job || 'N/A'}</td>
      <td>{formatDate(person.createdAt)}</td>
      <td>
        <div className="person-actions">
          <button className="btn-icon btn-edit" onClick={onEdit}>
            <i className="fas fa-edit"></i> Edit
          </button>
          <button className="btn-icon btn-delete" onClick={onDelete}>
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default PersonRow;

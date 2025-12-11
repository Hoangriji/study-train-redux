import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPersonThunk } from '../../store/slices/personSlice';
import Modal from '../Modal';

/**
 * AddPersonModal component - modal form for adding new person
 */
const AddPersonModal = ({ isOpen, onClose, onSuccess, onError }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
    phone: '',
    city: '',
    job: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim()) {
      onError('Name and email are required');
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(addPersonThunk(formData)).unwrap();
      setFormData({ name: '', email: '', avatar: '', phone: '', city: '', job: '' }); // Reset form
      onSuccess();
    } catch (err) {
      onError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle close and reset form
  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ name: '', email: '', avatar: '', phone: '', city: '', job: '' });
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} title="Add New Person" onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Avatar URL</label>
          <input
            type="url"
            value={formData.avatar}
            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            placeholder="Enter avatar URL (optional)"
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Enter phone number (optional)"
          />
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Enter city (optional)"
          />
        </div>

        <div className="form-group">
          <label>Job</label>
          <input
            type="text"
            value={formData.job}
            onChange={(e) => setFormData({ ...formData, job: e.target.value })}
            placeholder="Enter job title (optional)"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={handleClose} disabled={isSubmitting}>
            <i className="fas fa-times"></i> Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Adding...
              </>
            ) : (
              <>
                <i className="fas fa-plus"></i> Add Person
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPersonModal;

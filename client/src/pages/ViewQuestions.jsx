import { Footer, TitleBar } from '../utils/index.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewQuestions = () => {
  const [questions, setQuestions]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [editingId, setEditingId]   = useState(null);
  const [editTitle, setEditTitle]   = useState('');
  const [savingId, setSavingId]     = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError]           = useState(null);

  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('jwt');

  console.log(token);
  
  useEffect(() => { fetchOwnedQuestions(); }, []);

  const fetchOwnedQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch (`/api/questions/creator/${storedUser.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data?.error || "Failed to fetch questions");
      }

      setQuestions(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Edit Functionality
  const startEdit = (question) => {
    setEditingId(question.question_id);
    setEditTitle(question.question_title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const handleEditSave = async (questionId) => {
    if (!editTitle.trim()) return;

    setSavingId(questionId);

    try {
      const res = await fetch(`/api/questions/${questionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: editTitle.trim()})
      });
        
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Failed to update question");
        }

        setQuestions(prev => prev.map(q => q.question_id === questionId ? { ...q, question_title: editTitle.trim() } : q));
        cancelEdit();
    } catch (error) {
      alert(error.message);
    } finally {
      setSavingId(null);
    }
  };

  // Delete Functionality
  const handleDelete = async (questionId) => {
    if (!window.confirm('Are you sure you want to delete this question? It cannot be undone.')) {
      return;
    }

    setDeletingId(questionId);

    try {
      const res = await fetch(`/api/questions/${questionId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to delete question");
      }
      setQuestions(prev => prev.filter(q => q.question_id !== questionId));
    } catch (error) {
      alert(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  // Group questions by Year / Topic / Subtopic
  const grouped = questions.reduce((acc, q) => {
    const key = `Year ${q.year_group} - ${q.topic_name} - ${q.subtopic_name}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(q);
    return acc;
  }, {});

  return (
    <div className='page-wrapper'>
      <TitleBar />

      <div className='vq-header-container'>
        <div>
          <h1 className='vq-header'>My Questions</h1>
          <p className='vq-subheader'>Edit or delete your created questions</p>
        </div>
        <button className='vq-back-button' onClick={() => navigate('/teacher-portal')}>
          {"<- Back to Portal"}
        </button>
      </div>

      <div className='vq-body'>
        {loading && <div className='vq-state-message'>Loading your questions...</div>}

        {!loading && error && (
          <div className='vq-state-message vq-state-message--error'>
            {error}
            <button className='vq-retry-button' onClick={fetchOwnedQuestions}>Retry</button>
          </div>
        )}

        {!loading && !error && questions.length === 0 && (
          <div className='vq-state-message'>
            <p>You haven't created any questions yet.</p>
            <button className='vq-link' onClick={() => navigate('/question-portal')}>
              {"Create one now ->"}
            </button>
          </div>
        )}

        {!loading && !error && Object.entries(grouped).map(([groupLabel, qs]) => (
          <div key={groupLabel} className='vq-group'>
            <h2 className='vq-group-label'>{groupLabel}</h2>
            <div className='vq-group-list'>
              {qs.map(q => {
                const isEditing  = editingId  === q.question_id;
                const isSaving   = savingId   === q.question_id;
                const isDeleting = deletingId === q.question_id;
                
                return (
                  <div key={q.question_id} className={`vq-card ${isEditing ? 'vq-card--editing' : ''}`}>

                    <div className='vq-edit-input'>
                      {isEditing ? (
                        <input
                          className='vq-edit-input'
                          value={editTitle}
                          onChange={e => setEditTitle(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') handleEditSave(q.question_id);
                            if (e.key === 'Escape') cancelEdit();
                          }}
                          autoFocus
                        />
                        ) : (
                          <p className='vq-card-title'>{q.question_title}</p>
                        )}

                        <div className='vq-card-tags'>
                          <span className='vq-tag vq-tag--type'>{q.question_type}</span>
                          <span className='vq-tag vq-tag--id'>{q.question_id}</span>
                        </div>
                    </div>

                    <div className="vq-card-actions">
                      {isEditing ? (
                        <>
                          <button
                            className="vq-button vq-button--save"
                            onClick={() => handleEditSave(q.question_id)}
                            disabled={isSaving || !editTitle.trim()}
                          >
                            {isSaving ? 'Saving…' : 'Save'}
                          </button>
                          <button className="vq-button vq-button--cancel" onClick={cancelEdit} disabled={isSaving}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="vq-button vq-button--edit" onClick={() => startEdit(q)} disabled={isDeleting}>
                            Edit
                          </button>
                          <button className="vq-button vq-button--delete" onClick={() => handleDelete(q.question_id)} disabled={isDeleting}>
                            {isDeleting ? 'Deleting…' : 'Delete'}
                          </button>
                        </>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ViewQuestions;
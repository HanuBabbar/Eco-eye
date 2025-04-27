import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Container,
  Paper,
  Alert,
  TextField,
  Chip
} from '@mui/material';
import { Search, Refresh } from '@mui/icons-material';

const Admin = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'inactive'
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  // Fetch complaints from the API
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:8888/admin');
        console.log('API Response:', response.data);
        
        // Handle different response structures
        const data = response.data.complaintData || response.data.data || response.data;
        
        if (Array.isArray(data)) {
          setComplaints(data);
        } else {
          console.error('Unexpected API response structure');
          setComplaints([]);
        }
      } catch (error) {
        console.error('Error fetching complaints:', error);
        setNotification({ 
          type: 'error', 
          message: 'Failed to fetch complaints' 
        });
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Filter complaints based on status and search term
  const filteredComplaints = complaints.filter(complaint => {
    // Status filter
    const statusMatch = 
      filter === 'all' || 
      (filter === 'active' && complaint.complaintStatus === true) || 
      (filter === 'inactive' && complaint.complaintStatus === false);
    
    // Search filter
    const searchMatch = !searchTerm || 
      (complaint.name && complaint.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (complaint.type && complaint.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (complaint.location && complaint.location.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return statusMatch && searchMatch;
  });

  const toggleComplaintStatus = async (id) => {
    try {
      const complaint = complaints.find(c => c._id === id);
      const newStatus = !complaint.complaintStatus;
      
      await axios.patch(`http://localhost:8888/admin/complaints/${id}`, { 
        complaintStatus: newStatus 
      });
      
      setComplaints(prev => prev.map(c => 
        c._id === id ? { ...c, complaintStatus: newStatus } : c
      ));
      
      setNotification({ 
        type: 'success', 
        message: `Complaint marked as ${newStatus ? 'active' : 'inactive'}` 
      });
    } catch (error) {
      console.error('Error updating complaint:', error);
      setNotification({ 
        type: 'error', 
        message: 'Failed to update complaint status' 
      });
    }
    setTimeout(() => setNotification(null), 3000);
  };

  if (loading) {
    return (
      <Container sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '80vh' 
      }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {notification && (
        <Alert
          severity={notification.type}
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 2000,
            boxShadow: 3,
          }}
          onClose={() => setNotification(null)}
        >
          {notification.message}
        </Alert>
      )}

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Complaint Management
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button 
            variant={filter === 'all' ? 'contained' : 'outlined'}
            onClick={() => setFilter('all')}
          >
            All Complaints
          </Button>
          <Button 
            variant={filter === 'active' ? 'contained' : 'outlined'}
            onClick={() => setFilter('active')}
            color="success"
          >
            Active
          </Button>
          <Button 
            variant={filter === 'inactive' ? 'contained' : 'outlined'}
            onClick={() => setFilter('inactive')}
            color="error"
          >
            Inactive
          </Button>
        </Box>

        <TextField
          fullWidth
          placeholder="Search complaints..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />
          }}
          sx={{ mb: 3 }}
        />
      </Box>

      {filteredComplaints.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography>
            {filter === 'all' ? 'No complaints found' : 
             `No ${filter} complaints found`}
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredComplaints.map(complaint => (
            <Paper key={complaint._id} sx={{ p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {complaint.email || 'User Complaint'}
                  </Typography>
                  {/* <Typography color="text.secondary" sx={{ mb: 0.5 }}>
                    Type: {complaint.type || 'Not specified'}
                  </Typography> */}
                  <Typography color="text.secondary">
                    Location: {complaint.complaintLocation || 'Not'}
                  </Typography>
                  {complaint.description && (
                    <Typography sx={{ mt: 1.5 }}>
                      {complaint.complaintDescription}
                    </Typography>
                  )}
                  <Typography color="text.secondary" sx={{ mb: 0.5 }}>
                    AiOpinion: {complaint.aiOpinion || 'Not specified'}
                  </Typography>
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'flex-end',
                  gap: 1
                }}>
                  <Chip
                    label={complaint.complaintStatus ? 'ACTIVE' : 'INACTIVE'}
                    color={complaint.complaintStatus ? 'success' : 'error'}
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(complaint.createdAt || complaint.complaintDate).toLocaleString()}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    color={complaint.complaintStatus ? 'error' : 'success'}
                    onClick={() => toggleComplaintStatus(complaint._id)}
                  >
                    Mark as {complaint.complaintStatus ? 'Inactive' : 'Active'}
                  </Button>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Admin;
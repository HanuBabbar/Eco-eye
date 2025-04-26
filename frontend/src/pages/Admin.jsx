import React, { useState, useEffect } from 'react';
import { 
  Box, Card, CardContent, Typography, Grid, Button, Badge, Divider, 
  Avatar, Chip, CircularProgress, Container, Paper, Alert, 
  TextField, InputAdornment, IconButton, Tooltip, Drawer, List,
  ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  FolderOpen, PendingActions, CheckCircle, Refresh, Search, 
  FilterList, Dashboard, Assessment, Settings, AccountCircle,
  CalendarToday, Sort, MoreVert, Notifications, ExitToApp, ArrowDropDown
} from '@mui/icons-material';
// import axios from 'axios';

// Styled components with enhanced styling
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  borderRadius: theme.shape.borderRadius * 1.5,
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const RequestItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius * 1.5,
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease',
  border: '1px solid transparent',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? theme.palette.grey[800] 
      : theme.palette.grey[50],
    border: `1px solid ${theme.palette.divider}`,
    transform: 'translateX(5px)',
  },
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius * 3,
    backgroundColor: theme.palette.background.paper,
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' 
        ? theme.palette.grey[800] 
        : theme.palette.grey[50],
    },
    '&.Mui-focused': {
      boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.2)',
    },
  },
}));

const DashboardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    padding: '0 4px',
    height: 18,
    minWidth: 18,
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
}));

// Main component
const Admin = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('new');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Simulate fetching data from API
    const fetchRequests = async () => {
      try {
        // Replace with your actual API endpoint
        // const response = await axios.get('/api/requests');
        // setRequests(response.data);

        // Mock data for demonstration
        setRequests([
          { id: 1, name: 'John Doe', type: 'Tree Plantation', location: 'Central Park', status: 'new', date: '2025-04-24', priority: 'high' },
          { id: 2, name: 'Alice Smith', type: 'Water Cleanup', location: 'Harbor Bay', status: 'new', date: '2025-04-25', priority: 'medium' },
          { id: 3, name: 'Robert Brown', type: 'Waste Management', location: 'Downtown', status: 'pending', date: '2025-04-23', priority: 'low' },
          { id: 4, name: 'Emily Jones', type: 'Solar Panel Installation', location: 'Westside', status: 'pending', date: '2025-04-22', priority: 'high' },
          { id: 5, name: 'Michael Wilson', type: 'Community Garden', location: 'Northside', status: 'accepted', date: '2025-04-20', priority: 'medium' },
          { id: 6, name: 'Sarah Davis', type: 'Energy Audit', location: 'Eastside', status: 'accepted', date: '2025-04-19', priority: 'high' },
        ]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Filter and sort requests
  let filteredRequests = requests.filter(request => request.status === activeTab);
  
  if (searchTerm) {
    filteredRequests = filteredRequests.filter(request => 
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  filteredRequests = [...filteredRequests].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOrder === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOrder === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  const newRequestsCount = requests.filter(r => r.status === 'new').length;
  const pendingRequestsCount = requests.filter(r => r.status === 'pending').length;
  const acceptedRequestsCount = requests.filter(r => r.status === 'accepted').length;

  const handleStatusChange = async (id, newStatus) => {
    try {
      // In a real app, you'd update the server here
      // await axios.put(`/api/requests/${id}`, { status: newStatus });

      // Update local state
      const updatedRequests = requests.map(request =>
        request.id === id ? { ...request, status: newStatus } : request
      );
      setRequests(updatedRequests);
      
      // Show notification
      setNotification({ 
        type: 'success', 
        message: `Request status updated to ${newStatus}` 
      });
      
      // Clear notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Error updating request:", error);
      setNotification({ 
        type: 'error', 
        message: "Failed to update request status"
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Refresh requests
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

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
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderRadius: 2,
            animation: 'fadeIn 0.3s ease-out'
          }}
          onClose={() => setNotification(null)}
        >
          {notification.message}
        </Alert>
      )}
      
      <DashboardHeader>
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage eco initiative requests and applications
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Profile">
            <IconButton>
              <AccountCircle />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton>
              <StyledBadge badgeContent={4} color="error">
                <Notifications />
              </StyledBadge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton>
              <Settings />
            </IconButton>
          </Tooltip>
        </Box>
      </DashboardHeader>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={4}>
          <StyledCard
            onClick={() => setActiveTab('new')}
            sx={{
              borderTop: '4px solid #2196f3',
              bgcolor: activeTab === 'new' ? 'rgba(33, 150, 243, 0.08)' : 'background.paper',
              cursor: 'pointer'
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="medium">New Requests</Typography>
                <StyledBadge badgeContent={newRequestsCount} color="primary" max={99}>
                  <FolderOpen fontSize="large" color="primary" />
                </StyledBadge>
              </Box>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Incoming requests awaiting review
              </Typography>
              {activeTab === 'new' && (
                <Box mt={2} sx={{ width: '100%', height: 4, bgcolor: '#2196f3', borderRadius: 2 }} />
              )}
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={4}>
          <StyledCard
            onClick={() => setActiveTab('pending')}
            sx={{
              borderTop: '4px solid #ff9800',
              bgcolor: activeTab === 'pending' ? 'rgba(255, 152, 0, 0.08)' : 'background.paper',
              cursor: 'pointer'
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="medium">Pending Requests</Typography>
                <StyledBadge badgeContent={pendingRequestsCount} color="warning" max={99}>
                  <PendingActions fontSize="large" color="warning" />
                </StyledBadge>
              </Box>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Requests in process or under review
              </Typography>
              {activeTab === 'pending' && (
                <Box mt={2} sx={{ width: '100%', height: 4, bgcolor: '#ff9800', borderRadius: 2 }} />
              )}
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={4}>
          <StyledCard
            onClick={() => setActiveTab('accepted')}
            sx={{
              borderTop: '4px solid #4caf50',
              bgcolor: activeTab === 'accepted' ? 'rgba(76, 175, 80, 0.08)' : 'background.paper',
              cursor: 'pointer'
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="medium">Accepted Requests</Typography>
                <StyledBadge badgeContent={acceptedRequestsCount} color="success" max={99}>
                  <CheckCircle fontSize="large" color="success" />
                </StyledBadge>
              </Box>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Approved and completed requests
              </Typography>
              {activeTab === 'accepted' && (
                <Box mt={2} sx={{ width: '100%', height: 4, bgcolor: '#4caf50', borderRadius: 2 }} />
              )}
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="h5" fontWeight="500">
            {activeTab === 'new' && 'New Requests'}
            {activeTab === 'pending' && 'Pending Requests'}
            {activeTab === 'accepted' && 'Accepted Requests'}
          </Typography>
          <Chip 
            label={`${filteredRequests.length} items`} 
            size="small" 
            sx={{ ml: 1, fontWeight: 500 }}
            variant="outlined"
          />
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <SearchBar
            placeholder="Search requests..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              endIcon={<ArrowDropDown />}
              onClick={(e) => {
                const nextSortOrder = sortOrder === 'newest' ? 'oldest' : 
                  sortOrder === 'oldest' ? 'priority' : 'newest';
                setSortOrder(nextSortOrder);
              }}
              sx={{ 
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              {sortOrder === 'newest' && 'Newest'}
              {sortOrder === 'oldest' && 'Oldest'}
              {sortOrder === 'priority' && 'Priority'}
            </Button>
            
            <ActionButton
              startIcon={<Refresh />}
              variant="contained"
              color="primary"
              size="small"
              onClick={handleRefresh}
              sx={{ borderRadius: '20px' }}
            >
              Refresh
            </ActionButton>
          </Box>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CircularProgress color="primary" size={40} thickness={4} />
          <Typography variant="body1" sx={{ mt: 2 }}>Loading requests...</Typography>
        </Box>
      ) : filteredRequests.length === 0 ? (
        <Paper sx={{ textAlign: 'center', py: 6, borderRadius: 3, bgcolor: 'background.paper' }}>
          <Box sx={{ mb: 2, opacity: 0.7 }}>
            {activeTab === 'new' && <FolderOpen sx={{ fontSize: 60 }} color="primary" />}
            {activeTab === 'pending' && <PendingActions sx={{ fontSize: 60 }} color="warning" />}
            {activeTab === 'accepted' && <CheckCircle sx={{ fontSize: 60 }} color="success" />}
          </Box>
          <Typography variant="h6">No {activeTab} requests found</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {searchTerm ? 'Try adjusting your search terms' : `You don't have any ${activeTab} requests at this time`}
          </Typography>
        </Paper>
      ) : (
        <Box>
          {filteredRequests.map((request) => (
            <RequestItem key={request.id} elevation={1}>
              <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap={isMobile ? 'wrap' : 'nowrap'} gap={2}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 
                        request.priority === 'high' ? 'error.light' : 
                        request.priority === 'medium' ? 'warning.light' : 'success.light',
                      width: 50,
                      height: 50,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    {request.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="600">{request.name}</Typography>
                    <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                      <Chip
                        label={request.type}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ fontWeight: 500 }}
                      />
                      <Chip
                        label={request.priority}
                        size="small"
                        color={
                          request.priority === 'high' ? 'error' : 
                          request.priority === 'medium' ? 'warning' : 'success'
                        }
                        sx={{ 
                          fontWeight: 500, 
                          textTransform: 'capitalize',
                          fontSize: '0.7rem'
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {request.location}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flexShrink: 0, textAlign: isMobile ? 'left' : 'right', mt: isMobile ? 2 : 0, width: isMobile ? '100%' : 'auto' }}>
                  <Typography variant="body2" color="text.secondary">
                    Submitted: {new Date(request.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </Typography>
                  <Box sx={{ mt: 1.5, display: 'flex', gap: 1, justifyContent: isMobile ? 'flex-start' : 'flex-end' }}>
                    {activeTab === 'new' && (
                      <>
                        <ActionButton
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={() => handleStatusChange(request.id, 'pending')}
                        >
                          Review
                        </ActionButton>
                        <ActionButton
                          size="small"
                          variant="outlined"
                          color="error"
                        >
                          Reject
                        </ActionButton>
                      </>
                    )}
                    {activeTab === 'pending' && (
                      <>
                        <ActionButton
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => handleStatusChange(request.id, 'accepted')}
                        >
                          Accept
                        </ActionButton>
                        <ActionButton
                          size="small"
                          variant="outlined"
                          color="error"
                        >
                          Reject
                        </ActionButton>
                      </>
                    )}
                    {activeTab === 'accepted' && (
                      <ActionButton
                        size="small"
                        variant="outlined"
                        color="primary"
                      >
                        View Details
                      </ActionButton>
                    )}
                  </Box>
                </Box>
              </Box>
            </RequestItem>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Admin;
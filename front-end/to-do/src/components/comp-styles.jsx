import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

//... rest of your code


export const MainContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '5% 5%',
  backgroundColor: '#f5f5f5',
  height: '100vh',
}));


export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  color: theme.palette.text.secondary,
  position: 'relative',
  height: '45px',
  width: '60%',
  margin: '0 auto',
  borderRadius: '15px',
  transition: 'all 0.3s ease',  // Smooth transition for hover effects
  '&:hover': {
    transform: 'translateY(-10px)',  // Moves the Item up by 10 pixels on hover
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.12)',  // Adds a shadow for the lifting effect
  },
}));

export const StyledDialog = styled(Dialog)({
    '& .MuiDialog-paper': {
        width: '80%',
        maxWidth: '600px',
    },
});

export const StyledDialogContent = styled(DialogContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
});

export const StyledTextField = styled(TextField)({
    width: '100%',
});

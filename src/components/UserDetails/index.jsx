import React from 'react';
import { useSelector } from 'react-redux';
import { useGetUserDetailsQuery } from '../../redux/api';
import {  Paper, Typography, Box } from '@mui/material';
import UserDetailsSkeleton from './UserDetailsSkeleton';

const UserDetails = () => {
  const selectedUser = useSelector((state) => state.users.selectedUser);
  const { data = {}, isLoading, error,isFetching,isSuccess } = useGetUserDetailsQuery(
    { userId: selectedUser?.id },
    { skip: !selectedUser?.id,
    }
  );


  if (isLoading || isFetching) return <UserDetailsSkeleton />;
  if (error) return <div>Error loading user details</div>;

  const renderField = (label, value) => (
    <Box sx={{ display: 'inline-flex', gap: '5px', alignItems: 'center', flex: 1,width:'max-content' }}>
      <strong>{label}:</strong>
      <span>{value || 'N/A'}</span>
    </Box>
  );

  const renderTwoFieldsInRow = (field1, field2) => (
    <Box sx={{ display:'inline-flex', gap: '20px'}}>
      {field1}
      {field2}
    </Box>
  );

  
  if(isSuccess)
  return (
    <div>
      <Paper sx={{ p: 2, mb: 2,backgroundColor:"#fff" }}>
        <Box sx={{display:'flex', justifyContent:'space-between'}}>
          <Box sx={{flex:1}}>
            <Typography variant='h5' sx={{ mb: 1, fontWeight: 500 }}>
              {data?.firstName} {data?.lastName}
            </Typography>
            {renderTwoFieldsInRow(renderField('Phone', data.phone), renderField('Email', data.email))}
            </Box>
          <Box >
              {data.image ? <img src={data.image} alt="User" style={{ width: '100px', height: '100px' }} /> : 'N/A'}
          </Box>
        </Box>
     
      </Paper>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>Personal Details</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {renderTwoFieldsInRow(renderField('Maiden Name', data.maidenName), renderField('Age', data.age))}
          {renderTwoFieldsInRow(renderField('Gender', data.gender), renderField('Username', data.username))}
          {renderTwoFieldsInRow(renderField('Blood Group', data.bloodGroup), renderField('Height', data.height ? `${data.height} cm` : null))}
          {renderTwoFieldsInRow(renderField('Weight', data.weight ? `${data.weight} kg` : null), renderField('Eye Color', data.eyeColor))}
          {renderField('Birth Date', data.birthDate)}
        </Box>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>Hair Details</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {renderTwoFieldsInRow(renderField('Color', data.hair?.color), renderField('Type', data.hair?.type))}
        </Box>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>Address</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {renderTwoFieldsInRow(renderField('Address', data.address?.address), renderField('City', data.address?.city))}
          {renderTwoFieldsInRow(renderField('State', data.address?.state), renderField('Postal Code', data.address?.postalCode))}
          {renderTwoFieldsInRow(renderField('Country', data.address?.country), null)}
        </Box>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>Company Details</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {renderTwoFieldsInRow(renderField('Department', data.company?.department), renderField('Name', data.company?.name))}
          {renderTwoFieldsInRow(renderField('Title', data.company?.title), renderField('Address', data.company?.address?.address))}
          {renderTwoFieldsInRow(renderField('City', data.company?.address?.city), renderField('State', data.company?.address?.state))}
          {renderTwoFieldsInRow(renderField('Postal Code', data.company?.address?.postalCode), renderField('Country', data.company?.address?.country))}
        </Box>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>Bank Details</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {renderTwoFieldsInRow(renderField('Card Expiry', data.bank?.cardExpire), renderField('Card Number', data.bank?.cardNumber))}
          {renderTwoFieldsInRow(renderField('Card Type', data.bank?.cardType), renderField('Currency', data.bank?.currency))}
          {renderTwoFieldsInRow(renderField('IBAN', data.bank?.iban), null)}
        </Box>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>Crypto Details</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {renderTwoFieldsInRow(renderField('Coin', data.crypto?.coin), renderField('Wallet', data.crypto?.wallet))}
          {renderTwoFieldsInRow(renderField('Network', data.crypto?.network), null)}
        </Box>
      </Paper>
    </div>
  );
};

export default UserDetails;

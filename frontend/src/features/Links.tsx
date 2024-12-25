import { FormEvent, useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axiosApi from '../axiosApi';
import { apiUrl } from '../globalConstants.ts';

const Links = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
      const response = await axiosApi.post('/links', {originalUrl});
      setShortUrl(response.data.shortUrl);
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 600, margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom >Shorten your link</Typography>
      <TextField
        label="Enter URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        fullWidth
        required
      />
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Shorten!
      </Button>
      <Typography variant="h6" color="success" align="center" style={{ marginTop: '20px' }}>
        Your link now looks like this: <a href={`${apiUrl}/${shortUrl}`} target="_blank">{`${apiUrl}/${shortUrl}`}</a>
      </Typography>
    </form>
  );
};

export default Links;

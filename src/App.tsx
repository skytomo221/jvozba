import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material/index';
import { DataGrid } from '@mui/x-data-grid';
import { jvokaha, jvozba, selrafsi } from 'jvozba';

export default function App() {
  const [alignment, setAlignment] = React.useState('jvozba');
  const [text, setText] = React.useState('lujvo zbasu');
  const [columns, setColumns] = React.useState([
    { field: 'lujvo', headerName: 'Lujvo' },
    {
      field: 'score',
      headerName: 'Score',
      type: 'number',
    },
  ]);
  const [rows, setRow] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');

  const toggleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
    setText(newAlignment === 'jvozba' ? 'lujvo zbasu' : "jvoka'a");
  };

  const click = () => {
    try {
      setError(false);
      setHelperText('');
      if (alignment === 'jvozba') {
        setRow(jvozba(text.split(/\W/)).map((lujvo, id) => ({ id, ...lujvo })));
        setColumns([
          { field: 'lujvo', headerName: 'Lujvo' },
          {
            field: 'score',
            headerName: 'Score',
            type: 'number',
          },
        ]);
      }
      if (alignment === "jvoka'a") {
        setRow(jvokaha(text).map((word, id) => ({ id: id + 1, word, selrafsi: selrafsi(word) })));
        setColumns([
          { field: 'id', headerName: 'Index' },
          { field: 'word', headerName: 'Word' },
          { field: 'selrafsi', headerName: 'Selrafsi' },
        ]);
      }
    } catch (e) {
      setError(true);
      setHelperText(e.message);
      setColumns([]);
    }
  };

  return (
    <Container>
      <Box sx={{ p: 1 }}>
        <Grid container alignItems="center" justifyItems="center" spacing={2}>
          <Grid item>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={toggleChange}
            >
              <ToggleButton value="jvozba">jvozba</ToggleButton>
              <ToggleButton value="jvoka'a">jvoka&apos;a</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              id="outlined-basic"
              label="se pruce"
              variant="outlined"
              value={text}
              onChange={(event) => setText(event.target.value)}
              error={error}
              helperText={helperText}
            />
          </Grid>
          <Grid item>
            <Button variant="text" onClick={click}>
              {alignment === 'jvozba' ? 'zbasu' : 'katna'}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ p: 1 }}>
        <Grid container alignItems="center" justifyItems="center">
          <DataGrid autoHeight columns={columns} rows={rows} pageSize={10} />
        </Grid>
      </Box>
    </Container>
  );
}

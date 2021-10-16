import {
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  SyntheticEvent,
} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Grow from '@mui/material/Grow';
import Stack from '@mui/material/Stack';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Popper from '@mui/material/Popper';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Fab from '@mui/material/Fab';

type FilterButtonProps = {
  categories: string[];
  onFilterChange: (category: string) => void;
};

function FilterButton({ categories, onFilterChange }: FilterButtonProps) {
  const [open, setOpen] = useState<boolean>(false);

  function handleFilterButtonClick() {
    setOpen((state) => !state);
  }

  function handleFilterItemClick(category) {
    if (onFilterChange) {
      onFilterChange(category);
    }
    setOpen(false);
  }

  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={handleFilterButtonClick}
        onOpen={() => {
          setOpen(true);
        }}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem>
              <ListItemIcon>
                <FilterAltIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Filtrera på typ av maträtt" />
            </ListItem>
            {categories.map((category) => (
              <ListItem
                key={category}
                onClick={() => handleFilterItemClick(category)}
              >
                <ListItemButton
                  sx={{
                    backgroundColor: 'secondary.main',
                    color: '#fff',
                    borderRadius: 2,
                    height: '3.5rem',
                    '&:hover': {
                      backgroundColor: 'secondary.light',
                    },
                  }}
                >
                  {category}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
      <Fab
        color="primary"
        onClick={handleFilterButtonClick}
        aria-label="filter recipes"
        sx={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          height: '5rem',
          width: '5rem',
        }}
      >
        <FilterAltIcon sx={{ width: '2.25rem', height: '2.25rem' }} />
      </Fab>
    </div>
  );
}

export default FilterButton;

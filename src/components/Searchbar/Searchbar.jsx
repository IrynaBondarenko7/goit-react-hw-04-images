import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  StyledButtonLlabel,
  StyledSearchBar,
  StyledSearchForm,
  StyledSearchInput,
  Styledbutton,
} from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';

export const Searchbar = ({ onSubmit, resetPage }) => {
  const [imgName, setImgName] = useState('');

  const handleSearchImgNameChange = event => {
    setImgName(event.currentTarget.value.toLowerCase());
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (imgName.trim() === '') {
      toast.error('Enter the name for the search');
      return;
    }
    onSubmit(imgName);
    setImgName('');
    resetPage();
  };

  return (
    <StyledSearchBar>
      <Toaster />
      <StyledSearchForm onSubmit={handleSubmit}>
        <Styledbutton type="submit">
          <BsSearch />
          <StyledButtonLlabel>Search</StyledButtonLlabel>
        </Styledbutton>

        <StyledSearchInput
          type="text"
          value={imgName}
          onChange={handleSearchImgNameChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </StyledSearchForm>
    </StyledSearchBar>
  );
};

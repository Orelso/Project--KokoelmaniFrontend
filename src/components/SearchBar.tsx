/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import SearchIcon from '@mui/icons-material/Search';
import {useState} from 'react';
import {IconButton, TableCell, TableContainer, TextField} from '@mui/material';
import styled from 'styled-components';
// import {debounce} from 'lodash'
// import debounce from 'lodash.debounce'
import {useAtom} from 'jotai';
import {searchResultsAtom} from '../store';
import {Table} from '@mui/material';
import { Paper } from '@mui/material';

const FilterCard = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useAtom(searchResultsAtom);
	/** when the user types in the form, call to the API and populate the list of results
	 *
	 * TODO probably want to debounce/throttle the requests so we don't sent a new request with each keystroke
	 */
	const handleOnChange = ({target: {value}}: any) => {
		setSearchTerm(value);
		console.log('🚀 ~ file: SearchBar.tsx:29 ~ handleOnChange ~ value', value);
	};

	const handleSubmit = () => {
		// make a GET request to the server with the searchTerm as a query parameter
		// fetch(`/api/items?searchTerm=${value}`)
		fetch(`https://api.scryfall.com/cards/search?q=${searchTerm}`)
			.then((res) => res.json())
			.then((res) => {
				console.log('🚀 ~ file: SearchBar.tsx:25 ~ .then ~ data', res);
				const cards = res.data;
				setSearchResults(cards);
				// TODO setstate
				// do something with the response, for example, set the filtered items to a state variable
			})
			.catch((error: any) => {
				console.log(error);
			});
	};

	return (
		<FilterCardStyles>
			<TextField
				sx={{ml: 1, flex: 1, color: 'white'}}
				placeholder="Search..."
				onChange={handleOnChange}
				value={searchTerm}
				InputProps={{
					endAdornment: (
						<IconButton onClick={handleSubmit}>
							<SearchIcon />
						</IconButton>
					),
				}}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						handleSubmit();
					}
				}}
			/>
			{searchResults.map((result) => {
				console.log(result);
				return (
					<TableContainer component={Paper} elevation={13} sx={{overflow: "hidden" }}>
						<Table aria-label="simple table">
							<TableCell>
								<img title="Image title" alt="img" width="47" src={result.image_uris?.small} />
							</TableCell>
							<TableCell>{result.name}</TableCell>
							<TableCell>{result.mana_cost}</TableCell>
							<TableCell>{result.lang}</TableCell>
							<TableCell>{result.artist}</TableCell>
						</Table>
					</TableContainer>
				);
			})}
		</FilterCardStyles>
	);
};

const FilterCardStyles = styled.div`
	max-width: 600px;
	width: 90vw;
	margin: auto;
	transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
	marginT &:hover {
		transform: scale(1.05);
	}
	.MuiTextField-root {
		align-items: center;
		width: 100%;
	}
	.MuiInputBase-input {
		width: 50vw;
	}
`;

export default FilterCard;



// const FilterCard = () => {
// 	const [searchTerm, setSearchTerm] = useState('');
// 	const [searchResults, setSearchResults] = useAtom(searchResultsAtom);
	

// 	const handleOnChange = ({target: {value}}: any) => {
// 		setSearchTerm(value);
// 		console.log('🚀 ~ file: SearchBar.tsx:29 ~ handleOnChange ~ value', value);
// 		debouncedHandleSubmit();
// 	};

// 	const handleSubmit = () => {
// 		debouncedHandleSubmit();
// 		// make a GET request to the server with the searchTerm as a query parameter
// 		// fetch(`/api/items?searchTerm=${value}`)
// 		fetch(`https://api.scryfall.com/cards/search?q=${searchTerm}`)
// 			.then((res) => res.json())
// 			.then((res) => {
// 				console.log('🚀 ~ file: SearchBar.tsx:25 ~ .then ~ data', res);
// 				const cards = res.data;
// 				setSearchResults(cards);
// 				// TODO setstate
// 				// do something with the response, for example, set the filtered items to a state variable
// 			})
// 			.catch((error: any) => {
// 				console.log(error);
// 			});
// 	};
// 	const debouncedHandleSubmit = debounce(handleSubmit, 500);
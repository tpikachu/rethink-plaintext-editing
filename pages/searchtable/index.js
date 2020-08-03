import { useMemo, Fragment } from "react";
import TableContainer from "./TableContainer";

const SearchTable = () => {
	const columns = useMemo(
		() => [
			{
				Header: "Title",
				accessor: "name.title"
			},
			{
				Header: "First Name",
				accessor: "name.first"
			},
			{
				Header: "Last Name",
				accessor: "name.last"
			},
			{
				Header: "Email",
				accessor: "email"
			},
			{
				Header: "City",
				accessor: "location.city"
			}
		],
		[]
	);

	// Fetch Data by
	// Filter: Search keyword
	// From: start page
	// Length: records count
	const fetchData = async (filter, from, length) => {
		const resp = await fetch(`http://localhost:5000/api/getData?filter=${filter}&from=${from}&len=${length}`);
		return resp.json();
	};

	return (
		<Fragment>
			<TableContainer columns={columns} fetchData={fetchData} />
		</Fragment>
	);
};

export default SearchTable;

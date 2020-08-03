import React, { useState, Fragment, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import Pagination from "rc-pagination";

const TableContainer = ({ columns, fetchData }) => {
	const [ filter, setFilter ] = useState("");
	const [ currentData, setCurrentData ] = useState([]);
	const [ pageCount, setPageCount ] = useState(100);
	const [ loading, setLoading ] = useState(true);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		gotoPage,
		state: { pageIndex, pageSize }
	} = useTable(
		{
			columns,
			data: currentData,
			initialState: {
				pageSize: 20,
				pageIndex: 1
			},
			manualPagination: true,
			pageCount
		},
		usePagination
	);

	console.log(loading);

	const fetchAndSetData = () => {
		setLoading(true);
		fetchData(filter, (pageIndex - 1) * pageSize, pageSize).then((data) => {
			setCurrentData(data.data);
			setPageCount(Math.ceil(data.totalLen / pageSize) + 1);
			setLoading(false);
		});
	};

	useEffect(
		() => {
			fetchAndSetData();
		},
		[ pageIndex, pageSize, filter ]
	);

	return (
		<Fragment>
			<input
				onChange={(e) => {
					setFilter(e.target.value);
					gotoPage(1);
				}}
				value={filter}
			/>
			{loading ? (
				<div>Loading ....</div>
			) : (
				<table {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps()}>{column.render("Header")}</th>
								))}
							</tr>
						))}
					</thead>

					<tbody {...getTableBodyProps()}>
						{rows.map((row) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			)}

			<Pagination
				current={pageIndex}
				pageSize={pageSize}
				onChange={gotoPage}
				total={pageSize * (pageCount - 1)}
			/>
		</Fragment>
	);
};

export default TableContainer;

import React, { useState } from "react";

const ShortURL = () => {
	const [ url, setUrl ] = useState("");
	const [ shortUrls, setShortUrls ] = useState([]);

	const onSubmit = (event) => {
		event.preventDefault();

		console.log(JSON.stringify({ url }));
		fetch(`http://127.0.0.1:${process.env.PORT || 5000}/shortUrl`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({ url })
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res), setShortUrls([ ...shortUrls, res ]);
			});
	};

	return (
		<div className="container">
			<form onSubmit={onSubmit}>
				<label>
					Url:
					<input type="text" name="name" value={url} onChange={(event) => setUrl(event.target.value)} />
				</label>
				<input type="submit" value="Submit" />
			</form>
			<table>
				<tbody>
					{shortUrls.map((shortUrl) => (
						<tr key={shortUrl._id}>
							<td>
								<label>Original:</label>
								<a href={shortUrl.originalUrl}>{shortUrl.originalUrl}</a>
							</td>
							<td>
								<label>ShortUrl:</label>
								<a href={process.env.SHORTENER_URL || "http://localhost:5000/" + shortUrl.shortUrl}>
									{shortUrl.shortUrl}
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ShortURL;

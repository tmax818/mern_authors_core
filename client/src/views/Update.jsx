import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";

const Update = (props) => {
	const { id } = useParams();
	const [name, setName] = useState('');

	useEffect(() => {
		axios.get('http://localhost:8000/api/authors/' + id)
			.then(res => {
				setName(res.data.name);
			})
	}, []);

	const updatePerson = e => {
		e.preventDefault();
		axios.patch('http://localhost:8000/api/authors/' + id, {
			name
		})
			.then(res => console.log(res))
			.catch(err => console.error(err));
	}

	return (
		<div>
			<h1>Update a Person</h1>
			<form onSubmit={updatePerson}>
				<p>
					<label>Name</label><br />
					<input type="text"
						   name="name"
						   value={name}
						   onChange={(e) => { setName(e.target.value) }} />
				</p>
				<input type="submit" />
			</form>
		</div>
	)
}

export default Update;
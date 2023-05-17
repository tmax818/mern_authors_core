import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

const Update = (props) => {
	const { id } = useParams();
	const [name, setName] = useState('');
	//Create an array to store errors from the API
	const [errors, setErrors] = useState([]);
	const navigate = useNavigate();

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
			.catch(err => {
				console.error(err)
				const errorResponse = err.response.data.errors; // Get the errors from err.response.data
				const errorArr = []; // Define a temp error array to push the messages in
				for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
					errorArr.push(errorResponse[key].message)
				}
				// Set Errors
				setErrors(errorArr);
			});
		navigate("/")
	}

	return (
		<div>
			<h1>Update a Person</h1>
			{errors.map((err, index) => <p key={index}>{err}</p>)}
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
import {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";


const AuthorForm = (props) => {
    const navigate = useNavigate()
    console.log(props)
    //keep track of what is being typed via useState hook
    const [name, setName] = useState("");
    //Create an array to store errors from the API
    const [errors, setErrors] = useState([]);
    //handler when the form is submitted
    const onSubmitHandler = e => {
        //prevent default behavior of submit
        e.preventDefault();
        //make a post request to create a new author
        axios.post('http://localhost:8000/api/authors', {
                name
            }
        )
            .then(res=>console.log(res))
            .catch(err=> {
                console.log(err)
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })

        navigate("/")
    }
    //onChange to update firstName and lastName
    return (
        <>

            <Link to={"/"}>Home</Link>
        <form onSubmit={onSubmitHandler}>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <h3>Add an Author:</h3>
            <p>
                <label>Name</label><br/>
                <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
            </p>
            <input type="submit"/>
        </form>
        </>
    )
}

export default AuthorForm;
import {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";


const AuthorForm = (props) => {
    const navigate = useNavigate()
    console.log(props)
    //keep track of what is being typed via useState hook
    const [name, setName] = useState("");

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
            .catch(err=>console.log(err))

        setName("");
    }
    //onChange to update firstName and lastName
    return (
        <>

            <Link to={"/"}>Home</Link>
        <form onSubmit={onSubmitHandler}>
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
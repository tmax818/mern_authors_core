import React from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const AuthorList = (props) => {
    const { removeFromDom } = props;
    const navigate = useNavigate();

    const deleteAuthor = (authorId) => {
        axios.delete('http://localhost:8000/api/authors/' + authorId)
            .then(res => {
                removeFromDom(authorId)
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <table>
                <thead>
                <tr>
                <th>Author</th>
                <th>Actions Available</th>
                </tr>
                </thead>
                <tbody>
            {props.authors.map((author, idx) => {
                return <tr key={idx}>
                    <td>{author.name}</td>
                    <td>
                        <button onClick={() => navigate(`/edit/${author._id}`)}>
                            Edit
                        </button>

                    <button onClick={(e)=>{deleteAuthor(author._id)}}>
                        Delete
                    </button>
                    </td>
                </tr>
            })}
                </tbody>
            </table>
        </div>
    )
}

export default AuthorList;


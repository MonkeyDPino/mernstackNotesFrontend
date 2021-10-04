import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

    state = {
        users : [],
        username : ''
    }

    async componentDidMount(){
       this.getUsers();
    }

    onChangeUsername= (e) => {
        this.setState({username: e.target.value})
    }

    onSubmit = async (e) => {
        
        e.preventDefault()
        await axios.post("http://localhost:4000/api/users",{
            username:this.state.username
        })
        this.setState({username:""})
        this.getUsers();

    }

    getUsers = async () =>{
        const res = await axios.get("http://localhost:4000/api/users")
       this.setState({users: res.data})
    }

    deleteUser = async (id) =>{
        await axios.delete("http://localhost:4000/api/users/"+id)
        this.getUsers();
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{flexGrow:1, marginRight: "1rem"}}>
                    <div className="card card-body">
                        <h3>Create a new user</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" onChange={this.onChangeUsername} value={this.state.username}/>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{marginTop:"1rem"}}>
                                Save
                            </button>
                        </form>
                    </div>
                </div>
                <div style={{flexGrow:2}}>
                    <ul className="list-group">
                        {
                            this.state.users.map(user => 
                                <li key={user._id} 
                                    className="list-group-item list-group-item-action" 
                                    onDoubleClick = {()=> this.deleteUser(user._id)}
                                    > 
                                    {user.username}
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

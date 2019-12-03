import React, {Component} from 'react'

export class AddTodo extends Component {

    // component state that exists only in this component
    state = {
        title: ''
    }

    // Changing the state based on what was typed in
    onChange = (e) => this.setState({title:e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        // Pass the title up and set this as a prop
        this.props.addTodo(this.state.title);
        this.setState({title: ''});
    }

    render() {
    
        return (
            <form onSubmit = {this.onSubmit} style= {{display: 'flex'}}>
                <input type='text'
                 name='title'
                 placeholder="Add Todo..." 
                 style={{flex: '10', padding: '5px'}}
                 value = {this.state.title}
                 onChange = {this.onChange}
                />
                <input 
                    type="submit"
                    value = "Submit"
                    className="btn"
                    style={{flex: '1'}}

                />

            </form>
        )
    }
}

export default AddTodo;
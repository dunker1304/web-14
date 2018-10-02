import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, Input, Button } from 'reactstrap';

class NewGame extends Component {
    state = {
        players: ['', '', '', '']
    }

    handleSumitForm = (event) => {
        event.preventDefault();

        const { updateGameState } = this.props;
        const { players } = this.state;

        axios({
            url: 'http://localhost:6969/api/game',
            method: 'POST',
            data: {
                players,
                scores: [ [0, 0, 0, 0] ]
            }
        }).then((data) => {
            if(data && data.data && data.data.success) {
                updateGameState(data.data.game);
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    handleInputChange = (event) => {
        let { players } = this.state;
        players[event.target.name] = event.target.value;
        this.setState({ players });
    }

    render() {
        return (
            <Form onSubmit={this.handleSumitForm}>
                <FormGroup>
                    <Input
                        onChange={this.handleInputChange}
                        className="border border-danger"
                        type="text"
                        placeholder="Player 1"
                        name="0"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        onChange={this.handleInputChange}
                        className="border border-danger"
                        type="text"
                        placeholder="Player 2"
                        name="1"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        onChange={this.handleInputChange}
                        className="border border-danger"
                        type="text"
                        placeholder="Player 3"
                        name="2"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        onChange={this.handleInputChange}
                        className="border border-danger"
                        type="text"
                        placeholder="Player 4"
                        name="3"
                        required
                    />
                </FormGroup>
                <FormGroup className="text-center">
                    <Button color="danger" type="submit">
                        Create new game
                    </Button>
                </FormGroup>
            </Form>
        );
    }
}

export default NewGame;
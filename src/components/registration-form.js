import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {Link} from 'react-router-dom';

import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
const passwordLength = length({min: 8, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password} = values;
        const user = {username, password};
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    validate={[required, nonEmpty, isTrimmed]}
                    label='Username:'
                />
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    validate={[required, passwordLength, isTrimmed]}
                    label='Password:'
                />
                <Field
                    component={Input}
                    type="password"
                    name="passwordConfirm"
                    validate={[required, nonEmpty, matchesPassword]}
                    label='Confirm Password:'
                />
                <button
                    className="form-button"
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Register
                </button>
                <Link to="/">Login</Link>
            </form>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);

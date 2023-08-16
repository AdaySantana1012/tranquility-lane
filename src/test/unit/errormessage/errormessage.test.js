import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

describe('ErrorMessage', () => {
  it('should render error message correctly', () => {
    const wrapper = shallow(<ErrorMessage>Oops! Something went wrong.</ErrorMessage>);
    expect(wrapper.find('.error').text()).toEqual('Oops! Something went wrong.');
  });
});
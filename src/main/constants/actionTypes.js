import mirror from 'mirror-creator';

export const userActions = mirror([
    'GET_CHECKCODE',
    'LOGIN_SUBMIT',
    'INPUT_CHANGE',
    'INIT_LOGIN_STATE'
], { prefix: 'login' });
import { createStore } from '@stencil/store';
import { authService } from '../services/auth.service';

const { state, onChange } = createStore({
    currentPlayerId: authService.getId() || '',
    currentRoles: authService.getRoles() || [],
    token: authService.getToken() || '',
    isLeader: (authService.getRoles() || []).includes('Leader'),
    isRegular: (authService.getRoles() || []).includes('NewWorld'),
    isInActive: (authService.getRoles() || []).includes('inactive'),
});

onChange('currentRoles', value => {
    state.isLeader = value.includes('Leader');
    state.isRegular = value.includes('NewWorld');
    state.isInActive = value.includes('inactive');
});

export default state;

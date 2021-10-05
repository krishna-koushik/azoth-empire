import { createStore } from '@stencil/store';
import { authService } from '../services/auth.service';

const { state, onChange } = createStore({
    currentPlayerId: authService.getId() || '',
    currentRoles: authService.getRoles() || [],
    token: authService.getToken() || '',
    isLeader: (authService.getRoles() || []).includes('Leaders') || (authService.getRoles() || []).includes('AE Leaders'),
    isRegular: (authService.getRoles() || []).includes('NewWorld') || (authService.getRoles() || []).includes('New World'),
    isInActive: (authService.getRoles() || []).includes('inactive'),
});

onChange('currentRoles', value => {
    state.isLeader = value.includes('Leaders') || value.includes('AE Leaders');
    state.isRegular = value.includes('NewWorld') || value.includes('New World');
    state.isInActive = value.includes('inactive');
});

export default state;

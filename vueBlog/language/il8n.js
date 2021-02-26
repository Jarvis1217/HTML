import {createI18n} from 'vue-i18n';
import messages from './index';

const i18n = createI18n({
    locale: localStorage.lang || 'en',
    messages,
})
export default i18n;
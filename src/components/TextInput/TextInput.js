import { forwardRef } from 'react';
import styles from './TextInput.module.css';

function TextInput({ value, onChange }, ref) {
    return <input ref={ref} type="text" value={value} onChange={onChange} className={styles.input} />;
}

export default forwardRef(TextInput);

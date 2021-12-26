import { useCallback, forwardRef } from 'react';
import styles from './TextInput.module.css';

function TextInput({ value, onChange, onEnterPress }, ref) {
    const handleKeyPress = useCallback(
        (e) => {
            if (e.key === 'Enter') {
                onEnterPress?.();
            }
        },
        [onEnterPress]
    );

    return (
        <input
            ref={ref}
            type="text"
            value={value}
            onChange={onChange}
            className={styles.input}
            onKeyPress={handleKeyPress}
        />
    );
}

export default forwardRef(TextInput);

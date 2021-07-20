import styles from './TextInput.module.css';

function TextInput({ value, onChange }) {
    return <input type="text" value={value} onChange={onChange} className={styles.input} />;
}

export default TextInput;

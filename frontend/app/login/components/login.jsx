import styles from "./login.module.css";

export function Login(props) {
  const { closeModal } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    // ログイン処理をここに実装
    alert("ログインしました");
    closeModal();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={closeModal} className={styles.closeButton}>
          ×
        </button>
        <h2>ログイン</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label className={styles.label}>ユーザー名:</label>
            <input type="text" required className={styles.input} />
          </div>
          <div>
            <label className={styles.label}>パスワード:</label>
            <input type="password" required className={styles.input} />
          </div>
          <button type="submit" className={styles.submitButton}>
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from "./BuscarPerfil.module.css";
import logoGithub from "../assets/imagens/logo-github.png";

const BuscarPerfil = () => {
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!username) {
            setError('Por favor, insira um nome de usuário.');
            return;
        }

        try {
            setError('');
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error(`Nenhum perfil foi encontrado com esse nome. Tente novamente`);
            }
            const data = await response.json();
            setProfile(data);
        } catch (err) {
            setProfile(null);
            setError(err.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <img src={logoGithub} alt="Logo do GitHub" />
                <h1 className={styles.title}>Perfil GitHub</h1>
            </div>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Digite um usuário do Github"
                    className={styles.input}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button className={styles.searchButton} onClick={handleSearch}>
                    <FaSearch />
                </button>
            </div>
            {(error || profile) && (
                <div className={styles.profileContainer}>
                    {error ? (
                        <span className={styles.error}>{error}</span>
                    ) : (
                        profile && (
                            <>
                                <img src={profile.avatar_url} alt={profile.name} className={styles.avatar} />
                                <div className={styles.profileContainerContent}>
                                    <h2>{profile.name}</h2>
                                    <p>{profile.bio}</p>
                                </div>
                            </>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default BuscarPerfil;
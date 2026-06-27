const API = "http://localhost:8000/api";

export async function getTodos() {
    const response = await fetch(`${API}/getTodo.php`);
    return await response.json();
}
import subprocess
import os

def start_servers():
    ##php_file = "server.php"
    
    print("🚀 Starting servers...")

    # Start processes
    npm_proc = subprocess.Popen("npm run dev", shell=True)
    php_proc = subprocess.Popen([
    "php",
    "-S",
    "localhost:8000",
    "-t",
    "backend"
])
    # Save PIDs to a file for the stop script to read later
    with open("pids.txt", "w") as f:
        f.write(f"{npm_proc.pid}\n{php_proc.pid}")

    print("📦 Node server running.")
    print(f"🐘 PHP server running at http://localhost:8000")
    print("📄 Process IDs saved to pids.txt. Run stop.py to close them.")

if __name__ == "__main__":
    start_servers()
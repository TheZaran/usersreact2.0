import "./globals.css";

const Layout = ({ children }) => {
    return (
        <html lang="ru">
        <body className='font-sans'>
        <header className="bg-white shadow-md py-4">
            <center>
                <h1 className="text-3xl font-medium">User List</h1>
            </center>
        </header>
        <main className="container mx-auto px-4 py-6">{children}</main>
        <footer className="bg-white shadow-md py-4">
            <center> <p className='text-gray-400 text-opacity-40'> made by Andrew </p> </center>
        </footer>
        </body>
        </html>
    );
};

export default Layout;
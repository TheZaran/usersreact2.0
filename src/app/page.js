'use client';

import React, { useEffect, useState } from 'react';
import UserCard from "./components/userCard";

const usersLimit = 15;
//начало
const Home = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);
    const [totalPages, setTotalPages] = useState(0);

//api inf
    useEffect(() => {
        const userFetch = async () => {
            try {
                const response = await fetch(`/api/users?q=${search}&limit=${usersLimit}&skip=${(currentPage - 1) * usersLimit}`);

                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }

                const data = await response.json();
                setUsers(data.users);
                setTotalPages(Math.ceil(data.total / usersLimit));
            } catch (error) {
                console.error("Ошибка при загрузке пользователей:", error);
            }
        };
        userFetch();
    }, [currentPage, search]);

//поиск
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearch(value);


        if (timeoutId) {
            clearTimeout(timeoutId);
        }


        const id = setTimeout(() => {
            setCurrentPage(1);
        }, 1000);

        setTimeoutId(id);
    };

//страницы
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

//хтмл
    return (
        <div>
            <center>
                <input
                    type="text"
                    placeholder="search"
                    className="px-40 py-2 border border-solid border-gray-400 rounded-md mt-8"
                    value={search}
                    onChange={handleSearch}
                />
                <button onClick={()=>{
                    setSearch('');
                    setCurrentPage(1);
                    if(timeoutId) clearTimeout(timeoutId);
                }}
                className='ml-4 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400'
                >
                    Clear
                </button>
            </center>
            <div className="user-list flex justify-center flex-wrap ">
                {users.map(user => (
                    <div key={user.id} className="hover:scale-105 transition-transform duration-300">
                        <UserCard user={user} />
                    </div>
                ))}
            </div>

            <div className="pagination flex justify-center">
                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`mx-1 px-3 py-1 border rounded-lg ${currentPage === page ? 'bg-black text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Home;
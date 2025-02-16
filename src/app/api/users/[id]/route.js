// app/api/users/[id]/route.js
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
    const { id } = params;

    try {
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Ошибка при загрузке пользователя" }, { status: 500 });
    }
}

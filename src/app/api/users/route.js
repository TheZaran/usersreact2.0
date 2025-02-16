// app/api/users/route.js
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("q") || "";
    const limit = searchParams.get("limit") || 10;
    const page = searchParams.get("page") || 1;
    const skip = (page - 1) * limit;

    try {
        const response = await fetch(`https://dummyjson.com/users/search?q=${search}&limit=${limit}&skip=${skip}`);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Ошибка при загрузке пользователей" }, { status: 500 });
    }
}

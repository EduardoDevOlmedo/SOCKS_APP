import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent){
     
     const { role = '' } = req.cookies;

     if(role !== 'admin'){
          const url = req.nextUrl.clone();
          url.pathname = "/";
          return NextResponse.redirect(url)
     }


     return NextResponse.next()
     

}
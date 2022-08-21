import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent){
     
     const role = req.cookies.get('role')

     if(!role || role !== 'admin'){
          const url = req.nextUrl.clone();
          url.pathname = "/";
          return NextResponse.redirect(url)
     }

    
     return NextResponse.next()
     
}


export const config = {
     matcher: ['/actions/add', '/actions/update/:path']
}
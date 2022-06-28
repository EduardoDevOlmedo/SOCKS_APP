import { Grid, Typography } from "@mui/material"
import { NextPage, GetServerSideProps } from "next"
import MainLayout from "../../components/layout/MainLayout"
import ProductCard from "../../components/ui/Card"
import { ProductFunctions } from "../../database"
import { IProduct } from "../../interfaces"


interface Props {
  products: IProduct[];
  q: string;
}

const SearchPage: NextPage<Props> = ({products, q}) => {

  return (
    <MainLayout title="Skeletons Socks SV - Home" pageDescription={`Skeletons Socks - ${q}`}>
      <Typography 
      sx={
        {
          marginTop: '15px',
          fontFamily: 'Nunito',
          textAlign: 'center'
        }
      }
      variant="h4">Buscando '{`${q}`}'</Typography>
      <Grid container spacing={2} sx={{mt: 2.5, width:'100%', textAlign: 'center'}}>
        {
          products.length === 0 ? <Typography
          sx={{fontFamily: 'Nunito', textAlign: 'center'}}
          >No se encontraron elementos que coincidan con '{`${q}`}'</Typography>
          : 
            products.map(product => (
              <ProductCard key={product._id} product={product}
              />
            ))
        }
      </Grid>
    </MainLayout>
  )
}

export default SearchPage

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
    const { q = '' } = params as {q: string};
    


    let products = await ProductFunctions.getProductByTerm(q)

    return {
      props: {
        products, q
      }
    }
}
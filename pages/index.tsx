import Banner from '@/components/Banner/Banner'
import PropertyCard from '@/components/Card/Card'
import { useQueryFetch } from '@/hooks';
import { IProperty } from '@/types/global.types';

export default function Home() {

	const { data:forSale, error:forSaleErr, isLoading:forSaleLoading, isFetching:forSaleFetcing } = useQueryFetch('for-sale', 'forSale');

	const { data:forRent, error: forRentErr, isLoading:forRentLoading, isFetching:forRentFetching } = useQueryFetch('for-rent', 'forRent');
	
	return (
		<>
		<div className="container">
			<Banner 
				imageSrc='https://images.pexels.com/photos/11718917/pexels-photo-11718917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
				smallTitle='Rent a Home'
				title='Rental Homes For Everyone'
				shortDescription='Explore Appartments, Villas, Homes and more...'
				buttonTxt='Explore Renting'
				pageLink='/search?purpose=for-rent'
			/>
			<hr />
			<div className="mx-auto">
				<h2 className="text-4xl font-bold my-2">Rental Homes</h2>
				{
				forSaleLoading || forSaleFetcing ? <p className="text-center my-10 text-gray-700 text-2xl">Loading ...</p> :  <PropertyCard data={(forSale as unknown) as IProperty[]} /> 
				}
			</div>
			<Banner   
				imageSrc='https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
				smallTitle='Buy a Home'
				title='Buy Homes For Everyone'
				shortDescription='Explore Appartments, Villas, Homes and more...'
				buttonTxt='Explore Homes'
				pageLink='/search?purpose=for-sale'
			/>
			<hr />
			<div className="mx-auto">
				<h2 className="text-4xl font-bold my-2">For Sale</h2>
				{
				forRentLoading || forRentFetching ? <p className="text-center my-10 text-gray-700 text-2xl">Loading ...</p> :  <PropertyCard data={(forRent as unknown) as IProperty[]}/> 
				}
			</div>
		</div>
		</>
	)
}

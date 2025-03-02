export default async function Product({ params }: { params: { id: string } }) {
    const {id} = await params;

    return (
        <div className=""> 
            <h1 className="">Product: {id}</h1>
        </div>
    );
}

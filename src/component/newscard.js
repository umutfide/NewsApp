import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Link,
    Image
} from "@nextui-org/react";

const NewsCard = ({ title, description, imageSrc, link }) => {
    return (
        //next.ui dakiyle tamamen aynı. component haline getirdim.
        <Card className="max-w-2xl mx-auto shadow-lg border border-gray-300 rounded-xl bg-gray-50 hover:shadow-2xl transition-shadow duration-300">
            <div className="relative w-full h-48 overflow-hidden">
                <Image
                    alt={title}
                    src={imageSrc}
                    className="w-full h-full object-cover"
                    width="100%"
                    height="100%"
                    radius="none"
                />
            </div>

            <CardHeader className="px-6 pt-6 pb-2">
                <h3 className="text-2xl font-bold text-gray-700">{title}</h3>
            </CardHeader>

            <Divider className="mx-6" />

            <CardBody className="px-6 py-4 text-gray-700 leading-relaxed">
                <p>{description}</p>
            </CardBody>

            <Divider className="mx-6" />

            <CardFooter className="px-6 py-4 flex justify-end">
                <Link
                    href={link}
                    className="bg-blue-600 text-gray-700 px-4 py-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                >
                    Devamını Oku
                </Link>
            </CardFooter>
        </Card>
    );
};

export default NewsCard;

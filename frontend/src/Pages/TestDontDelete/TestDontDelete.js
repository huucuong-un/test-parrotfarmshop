import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import { useToast } from '@chakra-ui/toast';
import { Switch } from '@chakra-ui/react';

function App() {
    const [species, setSpecies] = useState([]);
    const [colorInputs, setColorInputs] = useState([]);
    const [combineData, setCombineData] = useState([]);
    const initialCombineData = combineData.map((data) => ({
        ...data,
        availabilityStatus: data.availabilityStatus,
    }));
    const [loading, setLoading] = useState(false);
    const [colorExists, setColorExists] = useState(false); // State to track color existence
    const [img, setImg] = useState('');

    const [speciesColor, setSpeciesColor] = useState({
        status: true,
        imageUrl: 'https://example.com/image.jpg',
        color: '',
        speciesID: 0,
        price: 100,
    });

    const HandleSubmitColor = async (e, index) => {
        e.preventDefault();
        if (colorExists) {
            // Color exists, don't submit the form
            console.log('Color already exists, cannot submit the form');
            return;
        }
        const speciesID = species[index].id;
        const { color, price } = colorInputs[index];

        try {
            // Make a POST request to submit the color data for the specific species
            const response = await axios.post('http://localhost:8086/api/parrot-species-color', {
                status: speciesColor.status,
                imageUrl: img,
                color: color, // Use the color from the corresponding input
                speciesID: speciesID, // Use the species ID from the data
                price: price,
            });
            if (response.status === 200) {
                console.log(`POST request was successful for species ID ${speciesID}!!`);
                // Assuming the response contains the newly created post data
                // You can update your data or reset the color input here
                setColorInputs([]);
            } else {
                console.error(`POST request failed with status code - species: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error at species ID ${speciesID}: ${error}`);
        }
    };

    useEffect(() => {
        const fetchSpecies = async () => {
            const response = await axios.get('http://localhost:8086/api/parrot-species');
            setSpecies(response.data);
        };
        fetchSpecies();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = [];
            for (const item of species) {
                const parrot = { ...item };
                try {
                    parrot.colors = await ParrotSpeciesAPI.getListBySpeciesId(item.id);
                    data.push(parrot);
                } catch (error) {
                    console.log(error);
                }
            }
            setCombineData(data);
        };
        fetchData();
    }, [species]);
    const toast = useToast();

    // These state to handle data field
    // State for api parrot species

    // Handle posting image
    const postDetails = (pic) => {
        setLoading(true);
        if (pic === undefined) {
            toast({
                title: 'Select an image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            return;
        }

        if (pic.type === 'image/jpeg' || pic.type === 'image/png') {
            const data = new FormData();
            data.append('file', pic);
            data.append('upload_preset', 'parrotfarmshop');
            data.append('cloud_name', 'dkddhxz2g');
            fetch('https://api.cloudinary.com/v1_1/dkddhxz2g/image/upload', {
                method: 'post',
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setImg(data.url.toString());
                    console.log(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            toast({
                title: 'Select an image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }
    };

    function isExisted(id, input) {
        for (const item of combineData) {
            if (id === item.id) {
                console.log('existed for ID: ' + item.id);
                for (const child of item.colors) {
                    if (input === child.color.toString()) {
                        return true;
                    } else {
                        console.log('Color not existed');
                    }
                }
            } else {
                console.log('notexisted for ID: ' + item.id);
            }
        }
        return false;
    }
    const [specieStatus, setSpecieStatus] = useState([]);
    // const toggleSpeciesStatus = (speciesID) => {
    //     const updatedSpecies = species.map((item) => {
    //         if (item.id === speciesID) {
    //             return {
    //                 ...item,
    //                 availabilityStatus: !item.availabilityStatus,
    //             };
    //         }
    //         return item;
    //     });
    //     setSpecies(updatedSpecies);
    // };
    // const toggleSpeciesStatus = async (speciesID) => {
    //     try {
    //         // Make a PUT or PATCH request to update the species status

    //         const response = await ParrotSpeciesAPI.update(speciesID), {
    //             availabilityStatus: !species.find((item) => item.id === speciesID).availabilityStatus,
    //         });
    //         if (response.status === 200) {
    //             console.log(`Species status updated successfully for ID ${speciesID}!!`);
    //             // Update the species array with the new status
    //             const updatedSpecies = species.map((item) => {
    //                 if (item.id === speciesID) {
    //                     return {
    //                         ...item,
    //                         availabilityStatus: !item.availabilityStatus,
    //                     };
    //                 }
    //                 return item;
    //             });
    //             setSpecies(updatedSpecies);
    //         } else {
    //             console.error(`PUT request failed with status code - species: ${response.status}`);
    //         }
    //     } catch (error) {
    //         console.error(`Error updating species status for ID ${speciesID}: ${error}`);
    //     }
    // };
    const toggleSpeciesStatus = async (speciesID) => {
        try {
            // Find the species objects to update by their ID
            const speciesWithID = combineData.filter((species) => species.id === speciesID);
            console.log(speciesWithID);
            if (speciesWithID.length > 0) {
                // Calculate the new status
                const newStatus = !speciesWithID[0].availabilityStatus;
                const firstName = speciesWithID.name[0]; // Get the first name
                const firstQuantity = speciesWithID.quantity[0]; // Get the first quantity
                const firstNestQuantity = speciesWithID.nesQuantity[0]; // Get the first nesQuantity
                const data = {};
                // Make a PUT or PATCH request to update the species status
                const response = await ParrotSpeciesAPI.update(
                    {
                        id: speciesID,
                    },
                    {
                        name: firstName,
                        quantity: firstQuantity,
                        nesQuantity: firstNestQuantity,
                        availabilityStatus: newStatus,
                    },
                );

                if (response.status === 200) {
                    console.log(`Species status updated successfully for ID ${speciesID}!!`);
                    // Update the species array with the new status
                    const updatedSpecies = species.map((item) => {
                        if (item.id === speciesID) {
                            return {
                                ...item,
                                availabilityStatus: newStatus,
                            };
                        }
                        return item;
                    });
                    setSpecies(updatedSpecies);
                    // Update the status in the local data as well
                    const updatedCombineData = combineData.map((item) => {
                        if (item.id === speciesID) {
                            return {
                                ...item,
                                availabilityStatus: newStatus,
                            };
                        }
                        return item;
                    });
                    setCombineData(updatedCombineData);
                } else {
                    console.error(`PUT request failed with status code - species: ${response.status}`);
                }
            } else {
                console.error(`Species with ID ${speciesID} not found.`);
            }
        } catch (error) {
            console.error(`Error updating species status for ID ${speciesID}: ${error}`);
        }
    };

    // Rest of your code for color handling...

    const handleSpecieStatus = (data) => {
        // Update the availabilityStatus for the clicked species
        const updatedCombineData = combineData.map((item) => {
            if (item.id === data.id) {
                return {
                    ...item,
                    availabilityStatus: !data.availabilityStatus,
                };
            }
            return item;
        });
        setCombineData(updatedCombineData);
    };
    console.log('is colors existed: ' + isExisted(1, 'blue'));
    console.log(colorExists);
    console.log(combineData);
    return (
        <div>
            <h1>----------------------------------------------------</h1>
            {combineData.map((data, index) => (
                <ul key={index}>
                    <li>
                        Id: {data.id} | {data.name} | Status: {data.availabilityStatus.toString()}
                        <Switch
                            onChange={() => toggleSpeciesStatus(data.id)} // Toggle the species status
                            size="lg"
                            isChecked={data.availabilityStatus}
                        />
                        {data.availabilityStatus ? <p>Available</p> : <p>Unavailable</p>}
                        {data.colors.map((item, colorIndex) => (
                            <span key={colorIndex}>
                                {' colors: '} {item.color} | Price: {item.price} |
                            </span>
                        ))}
                    </li>
                    <form onSubmit={(e) => HandleSubmitColor(e, index)}>
                        <h3>Color</h3>
                        <input
                            type="text"
                            id="color"
                            name="color"
                            placeholder="Enter color"
                            value={colorInputs[index] ? colorInputs[index].color : ''} // Use the color input corresponding to the species
                            onChange={(e) => {
                                const isColorExisted = isExisted(data.id, e.target.value);
                                setColorExists(isColorExisted);
                                const updatedInputs = [...colorInputs];

                                if (!updatedInputs[index]) {
                                    updatedInputs[index] = {};
                                }
                                updatedInputs[index].color = e.target.value;
                                setColorInputs(updatedInputs);
                            }}
                            variant="filled"
                            required
                        />

                        <h3>Price</h3>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            placeholder="Enter price"
                            value={colorInputs[index] ? colorInputs[index].price : ''} // Use the price input corresponding to the species
                            onChange={(e) => {
                                const updatedInputs = [...colorInputs];
                                if (!updatedInputs[index]) {
                                    updatedInputs[index] = {};
                                }
                                updatedInputs[index].price = e.target.value;
                                setColorInputs(updatedInputs);
                            }}
                            variant="filled"
                            required
                        />
                        <h3>Image</h3>
                        <input
                            type="file"
                            id="img"
                            name="img"
                            accept="image/*"
                            onChange={(e) => postDetails(e.target.files[0])} // Pass the index of the species
                            required
                        />
                        <input
                            type="text"
                            id="id"
                            name="id"
                            placeholder="Enter species ID"
                            value={data.id}
                            readOnly // Make it read-only to display the species ID
                            variant="filled"
                            required
                        />
                        <button isLoading={loading} type="submit" width="100%" style={{ marginTop: 15 }} margin="8px">
                            ADD
                        </button>
                        <h1>----------------------------------------------------</h1>
                    </form>
                </ul>
            ))}
        </div>
    );
}

export default App;

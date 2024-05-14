import { useState, useEffect } from "react";
import { Container, Text, VStack, Box, Image, Input, SimpleGrid, Heading, Flex } from "@chakra-ui/react";
import axios from "axios";

const Index = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("https://sheetdb.io/api/v1/o88mcqdvgzk1f")
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        console.error("Error fetching cities:", error);
      });
  }, []);

  const filteredCities = cities.filter(city =>
    city.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxW="container.xl" p={0}>
      <Box as="nav" bg="blue.600" color="white" p={4}>
        <Heading as="h1" size="lg">NomadRank</Heading>
      </Box>
      <Box
        as="section"
        bgImage="url('/images/hero-background.jpg')"
        bgSize="cover"
        bgPosition="center"
        color="white"
        textAlign="center"
        py={20}
      >
        <Heading as="h2" size="2xl" mb={4}>Find Your Next Digital Nomad Destination</Heading>
        <Text fontSize="xl">Discover the best cities around the world for digital nomads.</Text>
      </Box>
      <Container maxW="container.md" mt={10}>
        <Input
          placeholder="Search for a city or country"
          mb={6}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredCities.map(city => (
            <Box key={city.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
              <Heading fontSize="xl">{city.city}</Heading>
              <Text mt={4}>{city.country}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Container>
  );
};

export default Index;
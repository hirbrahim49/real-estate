export interface Hostel {
    id: string;
    name: string;
    location:string;
    shortDescription: string;
    Image: string[]; // Now 3 Image per hostel
    video: string;
    price: string;
    facilities: string[];
    contact: string; // WhatsApp link
  }
  
  export interface LocationGroup {
    area: string;
    hostels: Hostel[];
  }
  
  export const hostelsData: LocationGroup[] = [
    {
      area: 'Mayfair',
      hostels: [
        {
          id: 'mayfair1',
          name: 'Mayfair Classic Hostel',
          location: '123 Mayfair Avenue', // Added specific address
          shortDescription: 'Spacious rooms, steady power supply.',
          Image: [
            '/Image/mayfair1.jpg',
            '/Image/mayfair1-2.jpg',
            '/Image/mayfair1-3.jpg'
          ],
          video: 'https://www.youtube.com/embed/sampleVideoId1',
          price: '₦180,000 / year',
          facilities: ['24/7 Electricity', 'Water', 'Wi-Fi', 'Kitchen', 'Security'],
          contact: 'https://wa.me/2348012345678',
        },
        {
          id: 'mayfair2',
          name: 'Mayfair Deluxe Villa',
          location: '120 Mayfair Avenue', // Added specific address
          shortDescription: 'Luxury hostel with private balconies.',
          Image: [
            '/Image/mayfair2.jpg',
            '/Image/mayfair2-2.jpg',
            '/Image/mayfair2-3.jpg'
          ],
          video: 'https://www.youtube.com/embed/sampleVideoId2',
          price: '₦250,000 / year',
          facilities: ['Parking', 'Kitchen', 'Water Heater', 'Security', 'Gym'],
          contact: 'https://wa.me/2348012345679',
        },
        {
          id: 'mayfair3',
          name: 'Mayfair Garden Suites',
          location: '7 College Road, opposite OAU Main Gate',
          shortDescription: 'Eco-friendly hostel with garden view.',
          Image: [
            '/Image/mayfair3.jpg',
            '/Image/mayfair3-2.jpg',
            '/Image/mayfair3-3.jpg'
          ],
          video: 'https://www.youtube.com/embed/sampleVideoId14',
          price: '₦220,000 / year',
          facilities: ['Solar Power', 'Study Lounge', 'Laundry', 'CCTV'],
          contact: 'https://wa.me/2348023456789',
        },
      ],
    },
  
    {
      area: 'Lagere',
      hostels: [
        {
          id: 'lagere1',
          name: 'Lagere Premium Lodge',
          location:"14 Lagere Road, beside Christ Life Church",
          shortDescription: 'Affordable, close to shops.',
          Image: [
            '/Image/lagere1.jpg',
            '/Image/lagere1-2.jpg',
            '/Image/lagere1-3.jpg'
          ],
          video: 'https://www.youtube.com/embed/sampleVideoId3',
          price: '₦150,000 / year',
          facilities: ['Security', 'Borehole', 'Proximity to market', 'Common Room'],
          contact: 'https://wa.me/2348098765432',
        },
        {
          id: 'lagere2',
          name: 'White House Hostel',
          location:"16 Lagere Road, beside Christ Life Church",
          shortDescription: 'Peaceful environment for students.',
          Image: [
            '/Image/lagere2.jpg',
            '/Image/lagere2-2.jpg',
            '/Image/lagere2-3.jpg'
          ],
          video: 'https://www.youtube.com/embed/sampleVideoId4',
          price: '₦170,000 / year',
          facilities: ['Power Backup', 'Water', 'Wi-Fi', 'Reading Area'],
          contact: 'https://wa.me/2348076543210',
        },
        {
          id: 'lagere3',
          name: 'Lagere Gold Hostel',
          location:"10 Lagere Road, beside Christ Life Church",
          shortDescription: 'Newly built with modern amenities.',
          Image: [
            '/Image/lagere3.jpg',
            '/Image/lagere3-2.jpg',
            '/Image/lagere3-3.jpg'
          ],
          video: 'https://www.youtube.com/embed/sampleVideoId15',
          price: '₦190,000 / year',
          facilities: ['AC Rooms', 'Fitness Corner', 'Cafeteria', '24/7 Security'],
          contact: 'https://wa.me/2348056789123',
        },
      ],
    },
  
    {
      area: 'Sabo',
      hostels: [
        {
          id: 'sabo1',
          name: 'Sabo City Hostel',
          location: "19 Sabo Junction, near Market Square",
          shortDescription: 'Luxury hostel with serene environment.',
          Image: [
            '/Image/sabo1.jpg',
            '/Image/sabo1-2.jpg',
            '/Image/sabo1-3.jpg'
          ],
          video: 'https://www.youtube.com/embed/sampleVideoId5',
          price: '₦220,000 / year',
          facilities: ['AC Rooms', 'Laundry', 'Parking', 'Rooftop Lounge'],
          contact: 'https://wa.me/2348034567890',
        },
        {
          id: 'sabo2',
          name: 'Sabo Diamond Suites',
          location: "3 OAU Back Gate Road",
          shortDescription: 'Executive rooms with smart TVs.',
          Image: [
            '/Image/sabo2.jpg',
            '/Image/sabo2-2.jpg',
            '/Image/sabo2-3.jpg'
          ],
          video: 'https://www.youtube.com/embed/sampleVideoId16',
          price: '₦280,000 / year',
          facilities: ['Smart Locks', 'Netflix', 'Mini-Fridge', 'Housekeeping'],
          contact: 'https://wa.me/2348045678901',
        },
      ],
    },
  
    {
      area: 'Damico',
      hostels: [
        {
          id: 'damico1',
          name: 'Damico Student Lodge',
          location: "5 Damico Road, behind Health Center",
          shortDescription: 'Clean & study-friendly.',
          Image: [
            '/Image/damico1.jpg',
            '/Image/damico1-2.jpg',
            '/Image/damico1-3.jpg'
          ],
          video: 'https://www.youtube.com/embed/sampleVideoId6',
          price: '₦200,000 / year',
          facilities: ['Library', 'Wi-Fi', 'Good Access Road', 'Quiet Hours'],
          contact: 'https://wa.me/2348076543210',
        },
        {
          id: 'damico2',
          name: 'Damico Elite Hostel',
          location: "22 Damico Hilltop Estate",
          shortDescription: 'Premium rooms for postgraduate students.',
          Image: [
            '/Image/damico2.jpg',
            '/Image/damico2-2.jpg',
            '/Image/damico2-3.jpg'
          ],
          video: 'https://www.youtube.com/embed/sampleVideoId17',
          price: '₦240,000 / year',
          facilities: ['Private Bath', 'Work Desk', 'Coffee Machine', 'Soundproof'],
          contact: 'https://wa.me/2348087654321',
        },
      ],
    },
  
    // Other areas with expanded data...
    {
      area: 'Maintenance',
      hostels: [
        {
          id: 'maint1',
          name: 'Maintenance View Hostel',
          location: "15 Maintenance Yard, beside Engineering Faculty",
          shortDescription: 'Nice view with spacious rooms.',
          Image: [
            '/Image/maintenance1.jpg',
            '/Image/maintenance1-2.jpg',
            '/Image/maintenance1-3.jpg'
          ],
          video: 'https://www.youtube.com/embed/sampleVideoId7',
          price: '₦190,000 / year',
          facilities: ['Balcony', 'Water', '24/7 Light', 'Garden'],
          contact: 'https://wa.me/2348096543211',
        },
        {
          id: 'maint2',
          name: 'Maintenance Platinum',
          location: "10 Campus View Estate, Maintenance",
          shortDescription: 'Luxury living near campus.',
          Image: [
            '/Image/maintenance2.jpg',
            '/Image/maintenance2-2.jpg',
            '/Image/maintenance2-3.jpg'
          ],
          video: 'https://www.youtube.com/embed/sampleVideoId18',
          price: '₦260,000 / year',
          facilities: ['Jacuzzi', 'Smart Home', 'Chef Service', 'Cinema Room'],
          contact: 'https://wa.me/2348109876543',
        },
      ],
    },
  
    {
        area: 'Asherifa',
        hostels: [
          {
            id: 'asherifa1',
            name: 'Asherifa Luxury Hostel',
            location: "7 Asherifa Road, near Law Faculty",
            shortDescription: 'Beautiful hostel with AC rooms.',
            Image: [
              '/Image/asherifa1.jpg',
              '/Image/asherifa1-2.jpg',
              '/Image/asherifa1-3.jpg'
            ],
            video: 'https://www.youtube.com/embed/sampleVideoId8',
            price: '₦230,000 / year',
            facilities: ['Kitchen', 'Security', 'Stable Light', 'Study Room'],
            contact: 'https://wa.me/2348091111222',
          },
          {
            id: 'asherifa2',
            name: 'Asherifa Gold Residence',
            location: "1 Golden Estate, Asherifa",
            shortDescription: 'Premium rooms with city views.',
            Image: [
              '/Image/asherifa2.jpg',
              '/Image/asherifa2-2.jpg',
              '/Image/asherifa2-3.jpg'
            ],
            video: 'https://www.youtube.com/embed/sampleVideoId19',
            price: '₦270,000 / year',
            facilities: ['Elevator', 'Roof Deck', 'Fitness Center', 'Concierge'],
            contact: 'https://wa.me/2348102222333',
          },
          {
            id: 'asherifa3',
            name: 'Asherifa Eco Hostel',
            location: "4 Green Village, Asherifa",
            shortDescription: 'Sustainable living with solar power.',
            Image: [
              '/Image/asherifa3.jpg',
              '/Image/asherifa3-2.jpg',
              '/Image/asherifa3-3.jpg'
            ],
            video: 'https://www.youtube.com/embed/sampleVideoId20',
            price: '₦210,000 / year',
            facilities: ['Solar Panels', 'Recycling', 'Garden', 'Bicycle Parking'],
            contact: 'https://wa.me/2348113333444',
          },
        ],
      },
      
      {
        area: 'Road 7',
        hostels: [
          {
            id: 'road71',
            name: 'Road 7 Corner Lodge',
            location: '14 Road 7, opposite OAU Shopping Complex',
            shortDescription: 'Affordable, close to school.',
            Image: [
              '/Image/road7.jpg',
              '/Image/road7-2.jpg',
              '/Image/road7-3.jpg'
            ],
            video: 'https://www.youtube.com/embed/sampleVideoId9',
            price: '₦160,000 / year',
            facilities: ['Tiled Floor', 'Kitchen', 'Water', 'Common TV Lounge'],
            contact: 'https://wa.me/2348082222333',
          },
          {
            id: 'road72',
            name: 'Road 7 Executive Suites',
            location: '8 Road 7 Extension, beside Zenith Bank',
            shortDescription: 'Modern rooms with smart features.',
            Image: [
              '/Image/road7-4.jpg',
              '/Image/road7-5.jpg',
              '/Image/road7-6.jpg'
            ],
            video: 'https://www.youtube.com/embed/sampleVideoId21',
            price: '₦220,000 / year',
            facilities: ['Smart Lighting', 'Keyless Entry', 'Workstation', 'Netflix'],
            contact: 'https://wa.me/2348124444555',
          },
        ],
      },
      {
        area: 'OAUTHC Area',
        hostels: [
          {
            id: 'oauthc1',
            name: 'OAUTHC Medics Lodge',
            location: '2 Teaching Hospital Road, behind Nursing School',
            shortDescription: 'Perfect for medical students.',
            Image: [
              '/Image/oauthc1.jpg',
              '/Image/oauthc1-2.jpg',
              '/Image/oauthc1-3.jpg'
            ],
            video: 'https://www.youtube.com/embed/sampleVideoId10',
            price: '₦210,000 / year',
            facilities: ['Quiet Hours', 'Security', 'Hospital Proximity', 'Library'],
            contact: 'https://wa.me/2348073333444',
          },
          {
            id: 'oauthc2',
            name: 'OAUTHC Premium Hostel',
            location: '5 Medical Village Road, OAUTHC Complex',
            shortDescription: 'Luxury for health science students.',
            Image: [
              '/Image/oauthc2.jpg',
              '/Image/oauthc2-2.jpg',
              '/Image/oauthc2-3.jpg'
            ],
            video: 'https://www.youtube.com/embed/sampleVideoId22',
            price: '₦290,000 / year',
            facilities: ['Laundry Service', 'Cafeteria', 'Study Pods', 'On-call Nurse'],
            contact: 'https://wa.me/2348135555666',
          },
        ],
      },
      {
        area: 'Ibadan Garage',
        hostels: [
          {
            id: 'garage1',
            name: 'Ibadan Garage Suite',
            location: '12 Garage Road, near Ife Motor Park',
            shortDescription: 'Nice hostel with parking space.',
            Image: [
              '/Image/garage1.jpg',
              '/Image/garage1-2.jpg',
              '/Image/garage1-3.jpg'
            ],
            video: 'https://www.youtube.com/embed/sampleVideoId11',
            price: '₦180,000 / year',
            facilities: ['Parking', 'Water', 'Spacious Rooms', '24/7 Security'],
            contact: 'https://wa.me/2348095555666',
          },
          {
            id: 'garage2',
            name: 'Garage Transit Hostel',
            location: '7 Transport Avenue, beside GTB Garage',
            shortDescription: 'Ideal for frequent travelers.',
            Image: [
              '/Image/garage2.jpg',
              '/Image/garage2-2.jpg',
              '/Image/garage2-3.jpg'
            ],
            video: 'https://www.youtube.com/embed/sampleVideoId23',
            price: '₦165,000 / year',
            facilities: ['Flexible Leases', 'Luggage Storage', 'Travel Desk', 'Free Shuttles'],
            contact: 'https://wa.me/2348146666777',
          },
        ],
      },
      {
        area: 'AP Area',
        hostels: [
          {
            id: 'ap1',
            name: 'AP Prime Hostel',
            location: '3 AP Road, opposite Computer Science Building',
            shortDescription: 'Calm environment, 24/7 electricity.',
            Image: [
              '/Image/ap1.jpg',
              '/Image/ap1-2.jpg',
              '/Image/ap1-3.jpg'
            ],
            video: 'https://www.youtube.com/embed/sampleVideoId12',
            price: '₦200,000 / year',
            facilities: ['Good Road', 'Wi-Fi', 'Power Supply', 'Backup Generator'],
            contact: 'https://wa.me/2348067777888',
          },
          {
            id: 'ap2',
            name: 'AP Tech Hub Hostel',
            location: '9 Innovation Road, AP Tech Zone',
            shortDescription: 'Designed for tech students.',
            Image: [
              '/Image/ap2.jpg',
              '/Image/ap2-2.jpg',
              '/Image/ap2-3.jpg'
            ],
            video: 'https://www.youtube.com/embed/sampleVideoId24',
            price: '₦240,000 / year',
            facilities: ['High-Speed Internet', 'Workshop Space', '3D Printer', 'Coding Lounge'],
            contact: 'https://wa.me/2348157777888',
          },
        ],
      },
      {
        area: 'Parakin',
        hostels: [
          {
            id: 'parakin1',
            name: 'Parakin Royal Hostel',
            location: '4 Parakin Estate, off Ede Road',
            shortDescription: 'Premium hostel, fully tiled.',
            Image: [
              '/Image/parakin1.jpg',
              '/Image/parakin1-2.jpg',
              '/Image/parakin1-3.jpg'
            ],
            video: 'https://www.youtube.com/embed/sampleVideoId13',
            price: '₦250,000 / year',
            facilities: ['Generator', 'CCTV', 'Modern Kitchen', 'Game Room'],
            contact: 'https://wa.me/2348078888999',
          },
          {
            id: 'parakin2',
            name: 'Parakin Scholars Inn',
            location: '15 Academic Close, near Faculty of Arts',
            shortDescription: 'Quiet environment for academics.',
            Image: [
              '/Image/parakin2.jpg',
              '/Image/parakin2-2.jpg',
              '/Image/parakin2-3.jpg'
            ],
            video: 'https://www.youtube.com/embed/sampleVideoId25',
            price: '₦225,000 / year',
            facilities: ['Thesis Support', 'Research Library', 'Tutoring Space', 'Printing'],
            contact: 'https://wa.me/2348168888999',
          },
        ],
      }
  ];
  
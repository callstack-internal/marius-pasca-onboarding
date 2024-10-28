import { theme } from '@styles/index';
import React, { useContext, useEffect, useState } from 'react';
import searchIcon from '@assets/images/search.png';
import { View, TextInput, StyleSheet, TouchableOpacity, Animated, Easing, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WeatherContext } from '../context';
import useDebounced from '@components/utils/useDebounced';

const Header = () => {
    const { top } = useSafeAreaInsets();
    const [isExpanded, setIsExpanded] = useState(false);
    const { setSearch } = useContext(WeatherContext);
    const [searchText, setSearchText] = useState('');
    const heightAnim = useState(new Animated.Value(0))[0];

    const debouncedSearch = useDebounced(searchText, 500);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
        Animated.timing(heightAnim, {
            toValue: isExpanded ? 0 : 40,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        setSearch?.(debouncedSearch);
    }, [setSearch, debouncedSearch]);

    const onChangeText = (text: string) => {
        setSearchText(text);
    };

    return (
        <View style={[styles.container, { paddingTop: top }]}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Weather</Text>
                <TouchableOpacity onPress={toggleExpand} style={styles.searchContainer}>
                    {Boolean(searchText) && <View style={styles.bullet} />}
                    <Image source={searchIcon} style={styles.searchIcon} />
                </TouchableOpacity>
            </View>
            <Animated.View style={[styles.searchBar, { height: heightAnim }]}>
                {isExpanded && <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    value={searchText}
                    onChangeText={onChangeText}
                    autoFocus
                    onBlur={toggleExpand}
                />}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.PRIMARY,
        padding: 10,
        paddingBottom: 0,
    },
    titleContainer: {
        height: 28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.WHITE,
    },
    searchContainer: {
        position: 'absolute',
        backgroundColor: theme.colors.WHITE,
        borderRadius: 10,
        right: 10,
    },
    searchIcon: {
        width: 32,
        height: 32,
    },
    searchBar: {
        backgroundColor: theme.colors.WHITE,
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    bullet: {
        height: 10,
        width: 10,
        borderRadius: 10,
        position: 'absolute',
        right: -2,
        top: -2,
        backgroundColor: theme.colors.SECONDARY,
    },
    input: {
        flex: 1,
        marginLeft: 16,
        fontSize: 16,
    },
    icon: {
        marginLeft: 5,
    },
});

export default Header;


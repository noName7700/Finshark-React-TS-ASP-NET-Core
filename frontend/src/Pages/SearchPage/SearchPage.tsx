import React, { useEffect } from 'react'
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import CardList from '../../Components/CardList/CardList';
import Search from '../../Components/Search/Search';
import { CompanySearch } from '../../company';
import { searchCompanies } from '../../api';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import { PortfolioGet } from '../../Models/Portfolio';
import { portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from '../../Services/PortfolioService';
import { toast } from 'react-toastify';

interface Props {}

const SearchPage = (props: Props) => {
    const [search, setSearch] = useState<string>("");
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([]);
    const [serverError, setServerError] = useState<string>("");
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        console.log(e);
    };
    useEffect(() => {
        getPortfolio();
    }, []);
    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchCompanies(search);
        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data)) {
            setSearchResult(result.data);
        }
    };
    const onPortfolioCreate = (e: any) => {
        e.preventDefault();
        portfolioAddAPI(e.target[0].value)
        .then((res) => {
            if (res?.status === 204) {
                toast.success("Stock added to portfolio!");
                getPortfolio();
            }
        }).catch((err) => toast.warning("Could not create portfolio item!"));
    };
    const onPortfolioDelete = (e: any) => {
        e.preventDefault();
        portfolioDeleteAPI(e.target[0].value)
        .then((res) => {
            if (res?.status == 200) {
                toast.success("Stock deleted from portfolio!");
                getPortfolio();
            }
        });
    }
    const getPortfolio = () => {
        portfolioGetAPI()
        .then((res) => {
            if (res?.data) {
                setPortfolioValues(res?.data);
            }
        }).catch((e) => {
            toast.warning("Could not get portfolio values!");
        });
    };
    return (
        <>
            <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange} />
            <ListPortfolio portfolioValues={portfolioValues!} onPortfolioDelete={onPortfolioDelete} />
            <CardList searchResult={searchResult} onPortfolioCreate={onPortfolioCreate} />
            {serverError && <h1>{serverError}</h1>}
        </>
    )
}

export default SearchPage
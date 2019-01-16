import React, {Component} from 'react';
import Navbar from './Navbar';
import RecipeList from './RecipeList';
import RecipeInput from './RecipeInput'
import './RecipeApp.css';

class RecipeApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: [
                {
                    id: 0,
                    title: "Spaghetti",
                    instructions: "Open jar of Spaghetti sauce.  Bring to simmer.  Boil water.  Cook pasta until done.  Combine pasta and sauce",
                    ingredients: ["pasta", "8 cups water", "1 box spaghetti"],
                    img: "spaghetti.jpg"
                },
                {
                    id: 1,
                    title: "Milkshake",
                    instructions: "Combine ice cream and milk.  Blend until creamy",
                    ingredients: ["2 Scoops Ice cream", "8 ounces milk"],
                    img: "milkshake.jpg"
                },
                {
                    id: 2,
                    title: "Avocado Toast",
                    instructions: "Toast bread.  Slice avocado and spread on bread.  Add salt, oil, and pepper to taste.",
                    ingredients: ["2 slices of bread", "1 avocado", "1 tablespoon olive oil", "1 pinch of salt", "pepper"],
                    img: "avocado_toast.jpg"
                }
            ],
            nextRecipeId: 3,
            showForm: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleShowForm = this.toggleShowForm.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    handleSubmit(recipe) {
        const newRecipe = {id: this.state.nextRecipeId, ...recipe}
        this.setState((prevState, props) => (
            {
                recipes: [...this.state.recipes, newRecipe],
                nextRecipeId: prevState.nextRecipeId++,
                showForm: false
            }
        ));
    }

    toggleShowForm(){
        const prevShowForm = this.state.showForm;
        this.setState({showForm: !prevShowForm})
    }

    onDelete(id){
        const recipes = this.state.recipes.filter(r => r.id !== id);
        this.setState({recipes});
    }

    render() {
        const {showForm} = this.state;
        return (
            <div className="App">
                <Navbar toggleShowForm = {this.toggleShowForm}/>
                {showForm ? <RecipeInput onSave={this.handleSubmit} onClose = {this.toggleShowForm}/> : null}
                <RecipeList
                    recipes={this.state.recipes}
                    onDelete = {this.onDelete}
                />
            </div>
        );
    }
}

export default RecipeApp;

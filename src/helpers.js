
  
export function constrain(value, constraints) {
    return Math.max(Math.min(value, constraints.max), constraints.min);
  }
  
export const findURLParams = () => {
    const urlParams = new URLSearchParams(location.search);
    const collectionParam = urlParams.get('collection');
    const postParam = urlParams.get('post');
    return {
      collection:collectionParam,
      post:postParam
    }
}

export const findNext = (item, arr, direction='forward') => {
    const index = arr.indexOf(item)
    let nextItem;
    if(direction==='reverse'){
        nextItem = (index > 0) ? arr[index-1] : arr[arr.length-1]
    }else{
        nextItem = (index < arr.length-1) ? arr[index+1] : arr[0]
    }
    return nextItem
}

export const findPost = (frame,post) => {
  KuulaPlayerAPI.load(frame, post);
}

export function jsUcfirst(string) 
  {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
